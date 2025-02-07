package com.rafael_souza_de_almeida.inTempo.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "bookmarks_tb")
public class Bookmark {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "bookmarks_sequence")
    @SequenceGenerator(name = "bookmarks_sequence", initialValue = 1, allocationSize = 1)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "post_id")
    private Post post;

    public Bookmark(Long id, User user, Post post) {
        this.id = id;
        this.user = user;
        this.post = post;
    }

    public Bookmark() {
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

    public Post getPost() {
        return post;
    }

    public void setPost(Post post) {
        this.post = post;
    }
}
