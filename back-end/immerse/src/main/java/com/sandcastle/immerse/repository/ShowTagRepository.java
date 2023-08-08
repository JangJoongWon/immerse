package com.sandcastle.immerse.repository;

import com.sandcastle.immerse.model.dto.ShowTagDto;
import com.sandcastle.immerse.model.entity.ShowEntity;
import com.sandcastle.immerse.model.entity.ShowTagEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShowTagRepository extends JpaRepository<ShowTagEntity , Long> {

    @Query(value = "SELECT * FROM shows_tags WHERE show_id = :showId" , nativeQuery = true)
    List<ShowTagEntity> findAllByShowId(Long showId);

    @Modifying
    @Query(value = "DELETE FROM shows_tags WHERE show_id = :showId" , nativeQuery = true)
    void deleteAllByShowId(Long showId);

}
