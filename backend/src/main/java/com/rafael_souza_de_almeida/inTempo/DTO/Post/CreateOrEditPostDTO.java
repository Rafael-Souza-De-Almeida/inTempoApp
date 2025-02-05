package com.rafael_souza_de_almeida.inTempo.DTO.Post;

import com.rafael_souza_de_almeida.inTempo.Entity.Post;

public class CreateOrEditPostDTO {

    private String user_id;
    private String content;

    public CreateOrEditPostDTO(Post entity) {

        this.user_id = entity.getUser().getId();
        this.content = entity.getContent();

    }

    public CreateOrEditPostDTO() {
    }

    public String getUser_id() {
        return user_id;
    }

    public String getContent() {
        return content;
    }
}
