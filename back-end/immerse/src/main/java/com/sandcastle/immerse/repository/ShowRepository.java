package com.sandcastle.immerse.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.sandcastle.immerse.model.entity.ShowEntity;

@Repository
public interface ShowRepository extends JpaRepository<ShowEntity, Long> {

	@Query(value = "select s from ShowEntity s where category_id = :category_id")
	List<ShowEntity> findByCategory(@Param("category_id") Long categoryId);
}
