package com.rafael_souza_de_almeida.inTempo.DTO.Follow;

import com.rafael_souza_de_almeida.inTempo.Entity.Follow;

public class FollowDTO {

    private Long id;
    private String user_id;
    private String follower_id;
    private String username;
    private String profile_pic;

    public FollowDTO(Follow entity, String follower_id) {
        this.id = entity.getId();
        this.username = entity.getUser().getUsername();
        this.follower_id = follower_id;
        this.user_id = entity.getUser().getId();
        this.profile_pic = entity.getUser().getImage_url();
    }


    public FollowDTO() {
    }

    public Long getId() {
        return id;
    }

    public String getUser_id() {
        return user_id;
    }

    public String getFollower_id() {
        return follower_id;
    }

    public String getUsername() {
        return username;
    }

    public String getProfile_pic() {
        return profile_pic;
    }
}
