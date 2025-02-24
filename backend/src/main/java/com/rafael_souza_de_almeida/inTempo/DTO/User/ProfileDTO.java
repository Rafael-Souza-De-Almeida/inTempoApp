package com.rafael_souza_de_almeida.inTempo.DTO.User;

import com.rafael_souza_de_almeida.inTempo.DTO.Follow.FollowerDTO;
import com.rafael_souza_de_almeida.inTempo.DTO.Follow.FollowingDTO;
import com.rafael_souza_de_almeida.inTempo.DTO.Post.PostDTO;
import com.rafael_souza_de_almeida.inTempo.Entity.User;

import java.util.List;

public class ProfileDTO {

    private String profile_pic;
    private String user_id;
    private String name;
    private String username;
    private List<FollowerDTO> followers;
    private List<FollowingDTO> following;
    private Long followersQuantity;
    private Long followingQuantity;
    private List<PostDTO> posts;
    private boolean isCurrentUserFollowing;

    public ProfileDTO(User userEntity, List<FollowerDTO> followers, List<FollowingDTO> following, Long followersQuantity, Long followingQuantity, List<PostDTO> posts, boolean isCurrentUserFollowing) {
        this.profile_pic = userEntity.getImage_url();
        this.user_id = userEntity.getId();
        this.name = userEntity.getName();
        this.username = userEntity.getUsername();
        this.followersQuantity = followersQuantity;
        this.followingQuantity = followingQuantity;
        this.followers = followers;
        this.following = following;
        this.posts = posts;
        this.isCurrentUserFollowing = isCurrentUserFollowing;
    }

    public ProfileDTO() {
    }

    public String getProfile_pic() {
        return profile_pic;
    }

    public String getUser_id() {
        return user_id;
    }

    public String getName() {
        return name;
    }

    public String getUsername() {
        return username;
    }

    public List<FollowerDTO> getFollowers() {
        return followers;
    }

    public List<FollowingDTO> getFollowing() {
        return following;
    }

    public Long getFollowersQuantity() {
        return followersQuantity;
    }

    public Long getFollowingQuantity() {
        return followingQuantity;
    }

    public List<PostDTO> getPosts() {
        return posts;
    }

    public boolean isCurrentUserFollowing() {
        return isCurrentUserFollowing;
    }
}
