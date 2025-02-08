package com.rafael_souza_de_almeida.inTempo.DTO.Comment;

public class CommentRequestDTO {

    private Long post_id;
    private String content;

    public CommentRequestDTO() {
    }

    public Long getPost_id() {
        return post_id;
    }

    public String getContent() {
        return content;
    }
}
