package com.sandcastle.immerse.repository;

import com.sandcastle.immerse.model.entity.ShowTagEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ShowTagRepository extends JpaRepository<ShowTagEntity, Long> {

    List<ShowTagEntity> findAll();

    @Modifying
    @Query(value = "SELECT * FROM shows_tags WHERE show_id = :showId ", nativeQuery = true)
    List<ShowTagEntity> findByShowId(@Param("showId") Long showId);

    @Modifying
    @Query(value = "DELET FROM shows_tags WHERE show_id = :showId " , nativeQuery = true)
    void delete(@Param("showId") Long ShowId);

    

}
