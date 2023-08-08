package com.sandcastle.immerse.repository;

import com.sandcastle.immerse.model.entity.SubscribeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubscribeRepository extends JpaRepository<SubscribeEntity, Long> {

    @Query("select count(s.id) > 0 " +
            "from SubscribeEntity s " +
            "where s.followerId.id = :followerId and s.followingId.id = :followingId")
    boolean existsByFollowingId(@Param("followerId") Long followerId, @Param("followingId") Long followingId);

    @Modifying
    @Query(value = "DELETE FROM subscriptions WHERE follower_id = :followerId AND following_id = :followingId", nativeQuery = true)
    void deleteByFollwerFollowing(@Param("followerId") Long followerId, @Param("followingId") Long followingId);
}
