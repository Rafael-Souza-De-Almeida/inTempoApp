package com.rafael_souza_de_almeida.inTempo.Repository;

import com.rafael_souza_de_almeida.inTempo.Entity.Bookmark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {

    @Query("SELECT b FROM Bookmark b Where b.user.id = :user_id AND b.post.id = :post_id")
    Optional<Bookmark> searchingForBookmarks(@Param("user_id") String userId, @Param("post_id") Long postId);

    @Query("SELECT b FROM Bookmark b WHERE b.user.id = :id")
    List<Bookmark> findAllUserBookmarks(@Param("id") String id);
}
