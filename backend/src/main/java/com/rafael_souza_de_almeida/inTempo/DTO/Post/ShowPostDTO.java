package com.rafael_souza_de_almeida.inTempo.DTO.Post;

import com.rafael_souza_de_almeida.inTempo.DTO.Comment.CommentDTO;
import com.rafael_souza_de_almeida.inTempo.Entity.Comment;
import com.rafael_souza_de_almeida.inTempo.Entity.Post;
import org.hibernate.annotations.Comments;

import java.util.Date;
import java.util.List;

public class ShowPostDTO {

    private Long id;
    private String content;
    private Date created_at;
    private Date updated_at;
    private String user_id;
    private String username;
    private String name;
    private String profile_pic;
    private Date user_created_at;
    private Long likeQuantity;
    private Long commentsQuantity;
    private List<CommentDTO> comments;

    public ShowPostDTO(Post entity, Long likeQuantity, Long commentsQuantity, List<CommentDTO> comments) {
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
        this.comments = comments;

    }

    public ShowPostDTO() {
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

    public String getName() {
        return name;
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

    public List<CommentDTO> getComments() {
        return comments;
    }

    public Date getUser_created_at() {
        return user_created_at;
    }
}
