package com.rafael_souza_de_almeida.inTempo.Controller;

import com.rafael_souza_de_almeida.inTempo.DTO.User.LoginRequestDTO;
import com.rafael_souza_de_almeida.inTempo.DTO.User.SignUpRequestDTO;
import com.rafael_souza_de_almeida.inTempo.Exception.EmailAlreadyTakenException;
import com.rafael_souza_de_almeida.inTempo.Exception.UsernameAlredyExistsException;
import com.rafael_souza_de_almeida.inTempo.Service.AuthenticationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/sign_in")
    public ResponseEntity<?> authenticate(@RequestBody LoginRequestDTO dto) {
        try {
            var result = authenticationService.authenticate(dto);
            return ResponseEntity.status(HttpStatus.OK).body(Map.of("token", result));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Usuário ou senha incorretos!");
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


}
