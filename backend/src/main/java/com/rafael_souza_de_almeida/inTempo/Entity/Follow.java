package com.rafael_souza_de_almeida.inTempo.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "followers_tb")
public class Follow {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "followers_sequence")
    @SequenceGenerator( name = "followers_sequence", initialValue = 1, allocationSize = 1)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "follower_id")
    private User follower;

    public Follow(Long id, User user, User follower) {
        this.id = id;
        this.user = user;
        this.follower = follower;
    }

    public Follow() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public User getFollower() {
        return follower;
    }

    public void setFollower(User follower) {
        this.follower = follower;
    }
}
