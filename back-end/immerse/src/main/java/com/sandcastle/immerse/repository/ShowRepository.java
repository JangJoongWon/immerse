package com.sandcastle.immerse.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.sandcastle.immerse.model.entity.ShowEntity;

@Repository
public interface ShowRepository extends JpaRepository<ShowEntity, Long> {

	@Query(value = "select s from ShowEntity s where category_id = :category_id")
	List<ShowEntity> findByCategory(@Param("category_id") Long categoryId);


	/**
	 * 최초 로딩시 지금 방송중인 공연 (현재 관람하고 있는 max_attendance 기준으로) 20개 정렬 조회
	 */
	@Modifying
	@Query(value = "select * from shows where show_progress =1 order by max_attendance desc limit 20", nativeQuery = true)
	List<ShowEntity> findAllShowsOrderByProgress();

	/**
	 * 최초 로딩시 지금 예정중인 공연 (현재 관람하고 있는 max_attendance 기준으로) 20개 정렬 조회
	 */
	@Modifying
	@Query(value = "select * from shows where show_progress =0 order by max_attendance desc limit 20", nativeQuery = true)
	List<ShowEntity> getShowsOrderByReservation();

	List<ShowEntity> findByTitleContains(String content);

}
