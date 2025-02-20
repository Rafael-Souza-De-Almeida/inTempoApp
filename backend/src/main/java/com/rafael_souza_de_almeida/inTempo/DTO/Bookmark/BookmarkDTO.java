package com.rafael_souza_de_almeida.inTempo.DTO.Bookmark;

import com.rafael_souza_de_almeida.inTempo.DTO.Post.PostDTO;
import com.rafael_souza_de_almeida.inTempo.Entity.Bookmark;

import java.util.Date;

public class BookmarkDTO {

    private Long id;
    private String user_id;
    private PostDTO post;




    public BookmarkDTO(Bookmark entity, Long likeQuantity, Long commentQuantity) {
        this.id = entity.getId();
        this.user_id = entity.getUser().getId();
        this.post = new PostDTO(entity.getPost(), likeQuantity, commentQuantity);
    }

    public BookmarkDTO() {
    }

    public Long getId() {
        return id;
    }

    public String getUser_id() {
        return user_id;
    }

    public PostDTO getPost() {
        return post;
    }
}
