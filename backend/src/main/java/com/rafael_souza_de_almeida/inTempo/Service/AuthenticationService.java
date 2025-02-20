package com.rafael_souza_de_almeida.inTempo.Service;

import com.rafael_souza_de_almeida.inTempo.DTO.Post.PostDTO;
import com.rafael_souza_de_almeida.inTempo.DTO.User.*;
import com.rafael_souza_de_almeida.inTempo.Entity.Post;
import com.rafael_souza_de_almeida.inTempo.Entity.User;
import com.rafael_souza_de_almeida.inTempo.Exception.EmailAlreadyTakenException;
import com.rafael_souza_de_almeida.inTempo.Exception.UserNotFoundException;
import com.rafael_souza_de_almeida.inTempo.Exception.UsernameAlredyExistsException;
import com.rafael_souza_de_almeida.inTempo.Repository.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseCookie;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class AuthenticationService {

     private final JwtService jwtService;
     private final UserRepository userRepository;
     private final PostRepository postRepository;
     private final FollowRepository followRepository;
     private final LikeRepository likeRepository;
     private final CommentRepository commentRepository;
     private final PasswordEncoder passwordEncoder;

    public AuthenticationService(JwtService jwtService, UserRepository userRepository, PostRepository postRepository, FollowRepository followRepository, LikeRepository likeRepository, CommentRepository commentRepository, PasswordEncoder passwordEncoder) {
        this.jwtService = jwtService;
        this.userRepository = userRepository;
        this.postRepository = postRepository;
        this.followRepository = followRepository;
        this.likeRepository = likeRepository;
        this.commentRepository = commentRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public UserDTO userData(HttpServletRequest request) throws UserNotFoundException {
        String user_id = jwtService.extractIdFromCookie(request);

        User user = userRepository.findById(user_id).orElseThrow(() -> new UserNotFoundException("Usuário não encontrado"));

        return new UserDTO(user);
    }

    public ProfileDTO getProfile(String userId) throws UserNotFoundException {

        User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("Usuário não encontrado."));

        List<PostDTO> allUserPosts = postRepository.findAllUserPosts(userId)
                .stream()
                .map((post) -> new PostDTO(post, likeRepository.likeQuantity(post.getId()),
                        commentRepository.commentsQuantity(post.getId())))
                .toList();

        Long followerQuantity = (long) followRepository.findAllUserFollowers(userId).size();

        Long followingQuantity = (long) followRepository.findAllUserFollowing(userId).size();



        return new ProfileDTO(user, followerQuantity, followingQuantity, allUserPosts);


    }

    public void authenticate(LoginRequestDTO dto, HttpServletResponse response) {

        Optional<User> possibleUser = userRepository.findByEmail(dto.getEmail());

        if(possibleUser.isEmpty()) {
            throw new RuntimeException("Usuário não encontrado");
        }

        User user = possibleUser.get();

        boolean isPasswordCorrect = passwordEncoder.matches(dto.getPassword(), user.getPassword());

        if(!isPasswordCorrect) {
            throw new RuntimeException("Email ous enha incorretas");
        }

         jwtService.generateToken(user, response);


    }

    @Transactional
    public SignUpRequestDTO save(SignUpRequestDTO dto) throws UsernameAlredyExistsException, EmailAlreadyTakenException {

        Optional<User> verifyUsername = userRepository.findByUsername(dto.getUsername());
        Optional<User> verifyEmail = userRepository.findByEmail(dto.getEmail());

        if(verifyUsername.isPresent()) {
            throw new UsernameAlredyExistsException("Este username está indisponível. Por favor, escolha outro.");
        }

        if(verifyEmail.isPresent()) {
            throw new EmailAlreadyTakenException("Este email já foi cadastrado.");
        }

        User user = new User();

        user.setEmail(dto.getEmail());
        user.setName(dto.getName());
        user.setUsername(dto.getUsername());
        String password = encodePassword(dto.getPassword());
        user.setPassword(password);

         userRepository.save(user);

        return new SignUpRequestDTO(user);


    }

    public void logout( HttpServletResponse response) {

        ResponseCookie cookie = ResponseCookie.from("jwt_token", "")
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(0)
                .sameSite("strict")
                .build();

        response.addHeader("set-cookie", cookie.toString());

    }

    public Optional<User> getProfilePic(String username) throws UserNotFoundException {
        Optional<User> user = userRepository.findByUsername(username);

        if(user.isEmpty()) {
            throw new UserNotFoundException("Usuário não encontrado");
        }

        return user;


    }

    @Transactional
    public UserDTO update(String name, String email, String username, MultipartFile profile_pic, HttpServletRequest request) throws UserNotFoundException, UsernameAlredyExistsException, IOException, EmailAlreadyTakenException {

        String userId = jwtService.extractIdFromCookie(request);

        User userToUpdate = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("Usuário não encontrado"));

        if(!userToUpdate.getId().equals(userId)) {
            throw new AccessDeniedException("Acesso negado");
        }

        if (email != null && !email.isEmpty()) {

            Optional<User> possibleEmail = userRepository.findByEmail(email);

            if(possibleEmail.isPresent() && !possibleEmail.get().getId().equals(userId)) {
                throw new EmailAlreadyTakenException("Email já cadastrado.");
            }


            userToUpdate.setEmail(email);
        }

        if(name != null && !name.isEmpty()) {
            userToUpdate.setName(name);
        }

        if(username != null && !username.isEmpty()) {
            Optional<User> possibleUsername = userRepository.findByUsername(username);

            if(possibleUsername.isPresent() && !possibleUsername.get().getId().equals(userId)) {
                throw new UsernameAlredyExistsException("Este username já está em uso. Por favor, tente outro.");
            }

            userToUpdate.setUsername(username);



        }

        if(profile_pic != null && !profile_pic.isEmpty()) {
            userToUpdate.setProfile_pic(profile_pic.getBytes());
            userToUpdate.setProfilePicType(profile_pic.getContentType());
            userToUpdate.setImage_url(generateImageUrl(userToUpdate.getUsername()));
        }

        userRepository.save(userToUpdate);

        return new UserDTO(userToUpdate);


    }

    private String generateImageUrl(String username) {
        return "http://localhost:8080/auth/" + username + "/profile_pic";
    }

    private String encodePassword(String password) {

        return passwordEncoder.encode(password);

    }
}
