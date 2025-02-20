package com.rafael_souza_de_almeida.inTempo.DTO.User;

import com.rafael_souza_de_almeida.inTempo.DTO.Post.PostDTO;
import com.rafael_souza_de_almeida.inTempo.Entity.Follow;
import com.rafael_souza_de_almeida.inTempo.Entity.Post;
import com.rafael_souza_de_almeida.inTempo.Entity.User;

import java.util.List;

public class ProfileDTO {

    private String profile_pic;
    private Long followers;
    private Long following;
    private List<PostDTO> posts;

    public ProfileDTO(User userEntity, Long followersQuantity, Long followingQuantity, List<PostDTO> posts) {
        this.profile_pic = userEntity.getImage_url();
        this.followers = followersQuantity;
        this.following = followingQuantity;
        this.posts = posts;
    }

    public ProfileDTO() {
    }

    public String getProfile_pic() {
        return profile_pic;
    }

    public Long getFollowers() {
        return followers;
    }

    public Long getFollowing() {
        return following;
    }

    public List<PostDTO> getPosts() {
        return posts;
    }
}
