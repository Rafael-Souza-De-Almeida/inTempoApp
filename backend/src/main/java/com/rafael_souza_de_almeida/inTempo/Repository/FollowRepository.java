package com.rafael_souza_de_almeida.inTempo.Repository;

import com.rafael_souza_de_almeida.inTempo.Entity.Follow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FollowRepository extends JpaRepository<Follow, Long> {

    @Query("SELECT f FROM Follow f WHERE f.follower.id = :id")
    List<Follow> findAllUserFollowers(@Param("id") String id);

    @Query("SELECT f FROM Follow f WHERE f.user.id = :id")
    List<Follow> findAllUserFollowing(@Param("id") String id);

    @Query("SELECT f FROM Follow f WHERE f.user.id = :user_id AND f.follower.id = :follower_id")
    Optional<Follow> searchingForFollow(@Param("user_id") String user_id, @Param("follower_id") String follower_id);

}
