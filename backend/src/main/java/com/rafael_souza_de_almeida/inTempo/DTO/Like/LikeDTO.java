package com.rafael_souza_de_almeida.inTempo.DTO.Like;


import com.rafael_souza_de_almeida.inTempo.Entity.Like;
import com.rafael_souza_de_almeida.inTempo.Entity.Post;
import com.rafael_souza_de_almeida.inTempo.Entity.User;

public class LikeDTO {

    private Long id;
    private String user_id;
    private Long post_id;

    public LikeDTO(Like entity) {
        this.id = entity.getId();
        this.user_id = entity.getUser().getId();
        this.post_id = entity.getPost().getId();
    }

    public LikeDTO() {
    }

    public Long getId() {
        return id;
    }

    public String getUser_id() {
        return user_id;
    }

    public Long getPost_id() {
        return post_id;
    }
}
