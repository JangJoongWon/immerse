package com.sandcastle.immerse.repository;

import com.sandcastle.immerse.model.entity.ImageFileEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageFileRepository extends JpaRepository<ImageFileEntity,Long> {

}
