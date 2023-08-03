package com.sandcastle.immerse.model.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sandcastle.immerse.model.enums.ShowProgress;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "shows")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ShowEntity {

	@Id
	@GeneratedValue
	@Column(name = "show_id")
	private Long showId;

	private String title;

	@Column(name = "start_time")
	private LocalDateTime startTime;

	@Column(name = "end_time")
	private LocalDateTime endTime;

	/**
	 * 상영 날짜
	 */
	private LocalDate date;

	private String description;

	/**
	 * 공연 썸네일
	 */
	private String thumbnail;

	/**
	 * 공연 가격
	 */
	private int price;

	/**
	 * 제한 인원
	 */
	@Column(name = "attendance_limit")
	private int attendanceLimit;

	/**
	 * 순간 최고 관객 수
	 */
	@Column(name = "max_attendance")
	@Builder.Default
	private int maxAttendance = 0;

	/**
	 * 공연의 진행 상황
	 *
	 */
	@Column(name = "show_progress")
	@Builder.Default
	private ShowProgress showProgress = ShowProgress.SCHEDULED;

	/**
	 * 공연의 카테고리
	 */
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "category_id")
	private CategoryEntity category;

	public void setCategory(CategoryEntity category) {
		this.category = category;
	}
}
