package com.rafael_souza_de_almeida.inTempo.DTO;

import com.rafael_souza_de_almeida.inTempo.Entity.User;

public class LoginRequestDTO {

    private String username;
    private String password;

    public LoginRequestDTO(User entity) {
        this.username = entity.getUsername();
        this.password = entity.getPassword();
    }

    public LoginRequestDTO() {
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }
}
