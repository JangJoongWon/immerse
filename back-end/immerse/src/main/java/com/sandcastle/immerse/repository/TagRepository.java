package com.sandcastle.immerse.repository;

import com.sandcastle.immerse.model.dto.TagDto;
import com.sandcastle.immerse.model.entity.TagEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TagRepository extends JpaRepository<TagEntity, Long> {

    TagEntity save(TagDto tagDto);

    List<TagEntity> findAll();

    Optional<TagEntity> findById(Long id);

    @Modifying
    @Query(value = "UPDATE tags SET tag_name = ")
    TagEntity update(Long id, TagDto tagDto);

//    void delete(TagDto tagDto);
}
