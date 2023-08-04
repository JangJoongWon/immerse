package com.sandcastle.immerse.repository;

import com.sandcastle.immerse.model.entity.SearchEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SearchRepository extends JpaRepository<SearchEntity, Long> {
    List<SearchEntity> findAllByUserEntity_UserId(Long userId);

}
