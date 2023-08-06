package com.sandcastle.immerse.repository;

import com.sandcastle.immerse.model.entity.FileEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FileRepository extends JpaRepository<FileEntity , Long>{

}
