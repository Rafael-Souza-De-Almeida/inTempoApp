package com.rafael_souza_de_almeida.inTempo.DTO.User;

import com.rafael_souza_de_almeida.inTempo.Entity.User;

public class UserDTO {

    private String id;
    private String name;
    private String email;
    private String username;
    private String password;

    public UserDTO() {
    }

    public UserDTO(User entity) {
        this.id = entity.getId();
        this.name = entity.getName();
        this.email = entity.getEmail();
        this.username = entity.getUsername();
        this.password = entity.getPassword();
    }
}
