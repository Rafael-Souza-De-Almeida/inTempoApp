package com.rafael_souza_de_almeida.inTempo.DTO;

import com.rafael_souza_de_almeida.inTempo.Entity.User;

public class LoginRequestDTO {

    private String email;
    private String password;

    public LoginRequestDTO(User entity) {
        this.email = entity.getEmail();
        this.password = entity.getPassword();
    }

    public LoginRequestDTO() {
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }
}
