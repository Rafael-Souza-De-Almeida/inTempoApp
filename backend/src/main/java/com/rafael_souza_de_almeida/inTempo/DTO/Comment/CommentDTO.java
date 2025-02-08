package com.rafael_souza_de_almeida.inTempo.DTO.Comment;

import com.rafael_souza_de_almeida.inTempo.Entity.Comment;

public class CommentDTO {

    private Long id;
    private String user_id;
    private String username;
    private Long post_id;
    private String content;

    // TO-DO: adiconar atributo para foto de perfil do usuário


    public CommentDTO(Comment entity) {
        this.id = entity.getId();
        this.user_id = entity.getUser().getId();
        this.username = entity.getUser().getUsername();
        this.post_id = entity.getPost().getId();
        this.content = entity.getContent();
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
}
