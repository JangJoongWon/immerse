package com.sandcastle.immerse.repository;

import com.sandcastle.immerse.model.dto.TagDto;
import com.sandcastle.immerse.model.entity.TagEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TagRepository extends JpaRepository<TagEntity, Long> {

    TagEntity save(TagDto tagDto);

    List<TagEntity> findAll();

    @Modifying
    @Query(value = "SELECT * FROM tags WHERE tag_id = :id" , nativeQuery = true)
    Optional<TagEntity> findById(@Param("id") Long id);

    @Modifying
    @Query(value = "SELECT * FROM tags WHERE tag_name = :name" , nativeQuery = true)
    Optional<TagEntity> findByName(@Param("name") String name);

    @Modifying
    @Query(value = "DELETE FROM tags WHERE tag_id = :id" , nativeQuery = true)
    void deleteById(@Param("id") Long id);

}
