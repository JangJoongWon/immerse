package com.sandcastle.immerse.model.dto.show;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.sandcastle.immerse.model.enums.ShowProgress;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Data
@Getter
@Builder
public class ShowResponse {

	private Long showId;

	private String title;

	private LocalDateTime startTime;

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
	private int attendanceLimit;

	/**
	 * 순간 최고 관객 수
	 */
	private int maxAttendance;

	/**
	 * 공연의 진행 상황
	 *
	 */
	private ShowProgress showProgress;

	/**
	 * 공연의 카테고리
	 */
	private Long category_id;

	/**
	 * 공연자
	 */
	private Long user_id;

	/**
	 * 공연자 별명
	 */
	private String nickname;
}
