package com.rafael_souza_de_almeida.inTempo.Repository;

import com.rafael_souza_de_almeida.inTempo.Entity.Like;
import com.rafael_souza_de_almeida.inTempo.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {

    @Query("SELECT l FROM Like l WHERE l.user.id = :id")
    List<Like> findAllUserLikes(@Param("id") String id);

    @Query("SELECT l FROM Like l WHERE l.user.id = :user_id AND l.post.id = :post_id")
    Optional<Like> searchingForLike(@Param("user_id") String userId, @Param("post_id") Long postId);

    @Query("SELECT COUNT(l) FROM Like l WHERE l.post.id = :post_id")
    Long likeQuantity(@Param("post_id") Long post_id);
}
