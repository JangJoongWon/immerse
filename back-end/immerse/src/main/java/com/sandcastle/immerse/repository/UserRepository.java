package com.sandcastle.immerse.repository;

import com.sandcastle.immerse.model.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findByEmail(String email);

    Optional<UserEntity> findByNickname(String nickname);

    boolean existsByNickname(String nickname);

    boolean existsByEmail(String email);

    List<UserEntity> findByNicknameContains(String content);

    @Query("SELECT u " +
            "FROM UserEntity u " +
            "INNER JOIN SubscribeEntity s " +
            "ON s.followingId = u.userId " +
            "WHERE s.followerId.id = :followerId")
    List<UserEntity> findFollowings(@Param("followerId") Long followerId);

    @Query("SELECT u " +
            "FROM UserEntity u " +
            "INNER JOIN SubscribeEntity s " +
            "ON s.followerId = u.userId " +
            "WHERE s.followingId.id = :followingId")
    List<UserEntity> findFollowers(@Param("followingId") Long followingId);
}
