package com.rafael_souza_de_almeida.inTempo.Service;

import com.rafael_souza_de_almeida.inTempo.DTO.User.LoginRequestDTO;
import com.rafael_souza_de_almeida.inTempo.DTO.User.SignUpRequestDTO;
import com.rafael_souza_de_almeida.inTempo.Entity.User;
import com.rafael_souza_de_almeida.inTempo.Exception.EmailAlreadyTakenException;
import com.rafael_souza_de_almeida.inTempo.Exception.UsernameAlredyExistsException;
import com.rafael_souza_de_almeida.inTempo.Repository.UserRepository;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class AuthenticationService {

     private final JwtService jwtService;
     private final UserRepository userRepository;
     private final PasswordEncoder passwordEncoder;

    public AuthenticationService(JwtService jwtService, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.jwtService = jwtService;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public void authenticate(LoginRequestDTO dto, HttpServletResponse response) {

        Optional<User> possibleUser = userRepository.findByEmail(dto.getEmail());

        if(possibleUser.isEmpty()) {
            throw new RuntimeException("Usuário não encontrado");
        }

        User user = possibleUser.get();

        boolean isPasswordCorrect = passwordEncoder.matches(dto.getPassword(), user.getPassword());

        if(!isPasswordCorrect) {
            throw new RuntimeException("Senha incorreta!");
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

    private String encodePassword(String password) {

        return passwordEncoder.encode(password);

    }
}
