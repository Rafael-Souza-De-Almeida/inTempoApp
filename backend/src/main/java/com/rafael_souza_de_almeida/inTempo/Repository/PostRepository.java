package com.rafael_souza_de_almeida.inTempo.Repository;

import com.rafael_souza_de_almeida.inTempo.Entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

}
