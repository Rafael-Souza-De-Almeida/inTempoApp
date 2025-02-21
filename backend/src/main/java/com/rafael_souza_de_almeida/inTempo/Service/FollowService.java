package com.rafael_souza_de_almeida.inTempo.Service;

import com.rafael_souza_de_almeida.inTempo.DTO.Follow.FollowerDTO;
import com.rafael_souza_de_almeida.inTempo.DTO.Follow.FollowRequestDTO;
import com.rafael_souza_de_almeida.inTempo.Entity.Follow;
import com.rafael_souza_de_almeida.inTempo.Entity.User;
import com.rafael_souza_de_almeida.inTempo.Exception.FollowNotFoundException;
import com.rafael_souza_de_almeida.inTempo.Exception.UserNotFoundException;
import com.rafael_souza_de_almeida.inTempo.Repository.FollowRepository;
import com.rafael_souza_de_almeida.inTempo.Repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.coyote.BadRequestException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FollowService {

    private final FollowRepository followRepository;
    private final JwtService jwtService;
    private final UserRepository userRepository;

    public FollowService(JwtService jwtService, UserRepository userRepository, FollowRepository followRepository) {
        this.jwtService = jwtService;
        this.userRepository = userRepository;
        this.followRepository = followRepository;
    }

    public List<FollowerDTO> findAllUserFollowers(String username) throws UserNotFoundException {

        User user = userRepository.findByUsername(username).orElseThrow(() -> new UserNotFoundException("Usuário não encontrado"));

        List<Follow> userFollowers = followRepository.findAllUserFollowers(user.getId());

        return userFollowers.stream().map(FollowerDTO::new).toList();
    }

    public List<FollowerDTO> findAllUserFollowing(String username) throws UserNotFoundException {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new UserNotFoundException("Usuário não encontrado"));

        List<Follow> followedByUser = followRepository.findAllUserFollowing(user.getId());

        return followedByUser.stream().map(FollowerDTO::new).toList();
    }

    public void save(FollowRequestDTO dto, HttpServletRequest request) throws UserNotFoundException, BadRequestException {

        String user_id = jwtService.extractIdFromCookie(request);

        if(user_id.equals(dto.getFollow_id())) {
            throw new BadRequestException("Um usuário não pode seguir a si mesmo.");
        }

        User user = userRepository.findById(user_id).orElseThrow(() -> new UserNotFoundException("Usuario não encontrado"));

        User follower = userRepository.findById(dto.getFollow_id()).orElseThrow(() -> new UserNotFoundException("Não foi possível achar este uuário a ser seguido."));

        Optional<Follow> possibleFollow = followRepository.searchingForFollow(user.getId(), follower.getId());

        if(possibleFollow.isPresent()) {
            throw new BadRequestException("Não é possível seguir o mesmo usuário duas vezes.");
        }


        Follow follow = new Follow();

        follow.setUser(user);
        follow.setFollower(follower);

        followRepository.save(follow);

    }

    public void delete(Long id, HttpServletRequest request) throws FollowNotFoundException {
        Follow follow = followRepository.findById(id).orElseThrow(() -> new FollowNotFoundException("Seguidor não encontrado"));

        if(!follow.getUser().getId().equals(jwtService.extractIdFromCookie(request))) {
            throw new AccessDeniedException("Acesso negado");
        }

        followRepository.delete(follow);

    }


}
