package com.sandcastle.immerse.repository;

import com.sandcastle.immerse.model.entity.SubscribeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubscribeRepository extends JpaRepository<SubscribeEntity, Long> {

    @Query("DELETE FROM SubscribeEntity s WHERE s.followerId.id = :followerId AND s.followingId.id = :followingId")
    void deleteByFollwerFollowing(@Param("followerId") Long followerId, @Param("followingId") Long followingId);
}
