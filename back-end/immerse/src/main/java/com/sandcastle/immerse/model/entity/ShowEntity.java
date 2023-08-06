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
	@ManyToOne(fetch = FetchType.LAZY, targetEntity = CategoryEntity.class)
	@JoinColumn(name = "category_id")
	private CategoryEntity category;

	public void setCategory(CategoryEntity category) {
		this.category = category;
	}

	/**
	 * 공연자
	 */
	@ManyToOne(fetch = FetchType.LAZY, targetEntity = UserEntity.class)
	@JoinColumn(name = "user_id")
	private UserEntity user;

	public void setUser(UserEntity user) {
		this.user = user;
	}

	/**
	 * 공연이 예약중일 때, 진행중으로 변경하는 메서드
	 * 예약중 상태가 아니라면 예외 처리
	 */
	public void begin() throws IllegalStateException {
		if (showProgress != ShowProgress.SCHEDULED) {
			throw new IllegalStateException("The show trying to begin is not scheduled!");
		}
		showProgress = ShowProgress.IN_PROGRESS;
	}

	/**
	 * 공연이 진행중일 때, 끝남으로 변경하는 메서드
	 * 진행중 상태가 아니라면 예외 처리
	 */
	public void end() throws IllegalStateException {
		if (showProgress != ShowProgress.OVER) {
			throw new IllegalStateException("The show trying to end is not in progress!");
		}
		showProgress = ShowProgress.OVER;
	}
}
