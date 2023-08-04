package com.sandcastle.immerse.repository;

import com.sandcastle.immerse.model.entity.TagEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TagRepository extends JpaRepository<TagEntity, Long> {
    List<TagEntity> findAll();

    Optional<TagEntity> findById(Long id);

}
