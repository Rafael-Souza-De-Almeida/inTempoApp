package com.rafael_souza_de_almeida.inTempo.DTO.User;

import com.rafael_souza_de_almeida.inTempo.DTO.Follow.FollowingDTO;
import com.rafael_souza_de_almeida.inTempo.Entity.Follow;
import com.rafael_souza_de_almeida.inTempo.Entity.User;

import java.util.List;

public class UserDataDTO {

    private String id;
    private String name;
    private String email;
    private String username;
    private String image_url;



    public UserDataDTO(User entity) {
        this.id = entity.getId();
        this.name = entity.getName();
        this.email = entity.getEmail();
        this.username = entity.getUsername();
        this.image_url = entity.getImage_url();

    }

    public String getId() {
        return id;
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

    public String getImage_url() {
        return image_url;
    }


}
