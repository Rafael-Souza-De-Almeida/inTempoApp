package com.rafael_souza_de_almeida.inTempo.DTO.Follow;

import com.rafael_souza_de_almeida.inTempo.Entity.Follow;

public class FollowingDTO {

    private Long id;
    private String user_id;
    private String username;
    private String name;
    private String profile_pic;

    public FollowingDTO(Follow entity) {
        this.id = entity.getId();
        this.user_id = entity.getFollower().getId();
        this.username = entity.getFollower().getUsername();
        this.name = entity.getFollower().getName();
        this.profile_pic = entity.getFollower().getImage_url();
    }

    public FollowingDTO() {
    }

    public Long getId() {
        return id;
    }

    public String getUser_id() {
        return user_id;
    }

    public String getUsername() {
        return username;
    }

    public String getName() {
        return name;
    }

    public String getProfile_pic() {
        return profile_pic;
    }
}
