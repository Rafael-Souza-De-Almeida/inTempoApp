package com.rafael_souza_de_almeida.inTempo.DTO.Bookmark;

import com.rafael_souza_de_almeida.inTempo.Entity.Bookmark;

public class BookmarkDTO {

    private Long id;
    private String user_id;
    private Long post_id;

    public BookmarkDTO(Bookmark entity) {
        this.id = entity.getId();;
        this.user_id = entity.getUser().getId();
        this.post_id = entity.getPost().getId();
    }

    public BookmarkDTO() {
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
