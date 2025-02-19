package com.rafael_souza_de_almeida.inTempo.DTO.Comment;

import com.rafael_souza_de_almeida.inTempo.Entity.Comment;

import java.util.Date;

public class CommentDTO {

    private Long id;
    private String user_id;
    private String username;
    private Long post_id;
    private String content;
    private String profile_pic;
    private String name;
    private Date created_at;

    
    public CommentDTO(Comment entity) {
        this.id = entity.getId();
        this.user_id = entity.getUser().getId();
        this.username = entity.getUser().getUsername();
        this.post_id = entity.getPost().getId();
        this.content = entity.getContent();
        this.profile_pic = entity.getUser().getImage_url();
        this.name = entity.getUser().getName();
        this.created_at = entity.getCreated_at();
    }

    public CommentDTO() {
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

    public Long getPost_id() {
        return post_id;
    }

    public String getContent() {
        return content;
    }

    public String getProfile_pic() {
        return profile_pic;
    }

    public String getName() {
        return name;
    }

    public Date getCreated_at() {
        return created_at;
    }
}
