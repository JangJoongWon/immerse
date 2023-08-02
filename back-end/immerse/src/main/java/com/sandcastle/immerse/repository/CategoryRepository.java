package com.sandcastle.immerse.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sandcastle.immerse.model.entity.CategoryEntity;

import java.util.List;
import java.util.Optional;
@Repository
public interface CategoryRepository extends JpaRepository<CategoryEntity, Long> {
    /**
     * 모든 카테고리 리스트를 반환
     * @return
     */
    List<CategoryEntity> findAll();

    /**
     * 아이디에 맞는 카테고리 조회
     * @param id must not be {@literal null}.
     * @return
     */
    Optional<CategoryEntity> findById(Long id);
}
