package com.rafael_souza_de_almeida.inTempo.DTO.Post;

import com.rafael_souza_de_almeida.inTempo.Entity.Post;

import java.util.Date;

public class PostDTO {

    private Long id;
    private String content;
    private Date created_at;
    private Date updated_at;
    private String user_id;
    private Date user_created_at;
    private String username;
    private String name;
    private String profile_pic;
    private Long likeQuantity;
    private Long commentsQuantity;

    public PostDTO(Post entity, Long likeQuantity, Long commentsQuantity) {
        this.id = entity.getId();
        this.content = entity.getContent();
        this.created_at = entity.getCreated_at();
        this.updated_at = entity.getUpdated_at();
        this.name = entity.getUser().getName();
        this.user_id = entity.getUser().getId();
        this.username = entity.getUser().getUsername();
        this.user_created_at = entity.getUser().getCreated_at();
        this.likeQuantity = likeQuantity;
        this.commentsQuantity = commentsQuantity;
        this.profile_pic = entity.getUser().getImage_url();
    }

    public PostDTO(Post entity) {
        this.id = entity.getId();
        this.content = entity.getContent();
        this.created_at = entity.getCreated_at();
        this.updated_at = entity.getUpdated_at();
        this.user_id = entity.getUser().getId();
        this.username = entity.getUser().getUsername();
        this.name = entity.getUser().getName();
        this.profile_pic = entity.getUser().getImage_url() != null ? entity.getUser().getImage_url() : "";
    }



    public PostDTO() {
    }

    public Long getId() {
        return id;
    }

    public String getContent() {
        return content;
    }

    public Date getCreated_at() {
        return created_at;
    }

    public Date getUpdated_at() {
        return updated_at;
    }

    public String getUser_id() {
        return user_id;
    }

    public String getUsername() {
        return username;
    }

    public String getProfile_pic() {
        return profile_pic;
    }

    public Long getLikeQuantity() {
        return likeQuantity;
    }

    public Long getCommentsQuantity() {
        return commentsQuantity;
    }

    public String getName() {
        return name;
    }

    public Date getUser_created_at() {
        return user_created_at;
    }
}
