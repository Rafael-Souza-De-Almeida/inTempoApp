package com.rafael_souza_de_almeida.inTempo.DTO.User;

import com.rafael_souza_de_almeida.inTempo.Entity.User;

public class SignUpRequestDTO {

    private String name;
    private String email;
    private String username;
    private String password;

    public SignUpRequestDTO() {
    }

    public SignUpRequestDTO(User entity) {
        this.name = entity.getName();
        this.email = entity.getEmail();
        this.username = entity.getUsername();
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }
}
