package com.sandcastle.immerse.repository;

import com.sandcastle.immerse.model.entity.ShowTagEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ShowTagRepository extends JpaRepository<ShowTagEntity, Long> {

    List<ShowTagEntity> findAll();

    List<ShowTagEntity> findByShowId(Long showId);

    

}
