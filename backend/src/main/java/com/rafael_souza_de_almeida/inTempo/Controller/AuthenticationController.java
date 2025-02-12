package com.rafael_souza_de_almeida.inTempo.Controller;

import com.rafael_souza_de_almeida.inTempo.DTO.User.LoginRequestDTO;
import com.rafael_souza_de_almeida.inTempo.DTO.User.SignUpRequestDTO;
import com.rafael_souza_de_almeida.inTempo.DTO.User.UpdateUserRequestDTO;
import com.rafael_souza_de_almeida.inTempo.Entity.User;
import com.rafael_souza_de_almeida.inTempo.Exception.EmailAlreadyTakenException;
import com.rafael_souza_de_almeida.inTempo.Exception.UserNotFoundException;
import com.rafael_souza_de_almeida.inTempo.Exception.UsernameAlredyExistsException;
import com.rafael_souza_de_almeida.inTempo.Service.AuthenticationService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth")

public class AuthenticationController {

    private final AuthenticationService authenticationService;

    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @GetMapping
    public ResponseEntity<?> userData(HttpServletRequest request) {

        try {
            var result = authenticationService.userData(request);
            return ResponseEntity.status(HttpStatus.OK).body(result);
        } catch(UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
        }

    }

    @PostMapping("/sign_in")
    public ResponseEntity<?> authenticate(@RequestBody LoginRequestDTO dto, HttpServletResponse response) {
        try {
            authenticationService.authenticate(dto, response);
            return ResponseEntity.status(HttpStatus.OK).build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "Usuário ou senha incorretos!"));
        }
    }

    @PostMapping("/sign_up")
    public ResponseEntity<?> save(@RequestBody SignUpRequestDTO dto) {
        try {
            var result = authenticationService.save(dto);
            return ResponseEntity.status(HttpStatus.CREATED).body(result);
        } catch (UsernameAlredyExistsException | EmailAlreadyTakenException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @DeleteMapping("/sign_out")
    public ResponseEntity<?> delete(HttpServletResponse response) {
        authenticationService.logout(response);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PutMapping("/update_account")
    public ResponseEntity<?> update(@RequestParam(required = false) String name,
                                    @RequestParam(required = false) String email,
                                    @RequestParam(required = false) String username,
                                    @RequestPart(name = "profile_pic")MultipartFile profile_pic,
                                    HttpServletRequest request) {
        try {
            var result = authenticationService.update(name, email, username, profile_pic, request);
            return ResponseEntity.status(HttpStatus.OK).body(result);
        } catch (UserNotFoundException | UsernameAlredyExistsException | EmailAlreadyTakenException | IOException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @GetMapping("/{username}/profile_pic")
    public ResponseEntity<?> getProfilePic(@PathVariable String username) {

        try {
            Optional<User> user = authenticationService.getProfilePic(username);

            if(user.isPresent() && user.get().getProfile_pic() != null) {
                return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.parseMediaType(user.get().getProfilePicType()))
                        .body(user.get().getProfile_pic());
            }

            else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário sem foto de perfil");
            }
        } catch(UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }




}
