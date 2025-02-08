package com.rafael_souza_de_almeida.inTempo.DTO.User;

import org.springframework.web.multipart.MultipartFile;

public class UpdateUserRequestDTO {

    private String name;
    private String email;
    private String username;
    private MultipartFile profilePic;

    public UpdateUserRequestDTO(String name, String email, String username, MultipartFile profilePic) {
        this.name = name;
        this.email = email;
        this.username = username;
        this.profilePic = profilePic;
    }

    public UpdateUserRequestDTO() {
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getUsername() {
        return username;
    }

    public MultipartFile getProfilePic() {
        return profilePic;
    }
}
