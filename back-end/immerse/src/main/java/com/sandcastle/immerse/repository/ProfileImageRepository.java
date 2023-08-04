package com.sandcastle.immerse.repository;

import com.sandcastle.immerse.model.dto.ProfileImageDto;
import com.sandcastle.immerse.model.entity.ProfileImageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProfileImageRepository extends JpaRepository<ProfileImageEntity, Long> {
    // 추가적인 쿼리 메서드들...
//    @Modifying
//    @Query(value = "INSERT INTO profile_images")
//    Long createProfileImages(Long userId, ProfileImageDto profileImageDto);

    @Modifying
    @Query(value = "SELECT * FROM profile_images" , nativeQuery = true)
    List<ProfileImageDto> getAllProfileImages();
    @Modifying
    @Query(value = "SELECT * FROM profile_images WHERE user.id = :userId", nativeQuery = true)
    ProfileImageDto getImageFileByUserId(@Param("userId") Long userId);



}
