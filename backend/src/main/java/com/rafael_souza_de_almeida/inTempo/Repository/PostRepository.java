package com.rafael_souza_de_almeida.inTempo.Repository;

import com.rafael_souza_de_almeida.inTempo.Entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    @Query("SELECT p FROM Post p WHERE p.user.id = :id")
    List<Post> findAllUserPosts(@Param("id") String id);
}
