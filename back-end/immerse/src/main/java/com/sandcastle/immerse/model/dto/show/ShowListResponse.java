package com.sandcastle.immerse.model.dto.show;

import java.time.LocalDate;

import com.sandcastle.immerse.model.entity.ShowEntity;
import com.sandcastle.immerse.model.enums.ShowProgress;

import lombok.Data;

/**
 * ShowListResponse
 * 주재홍
 *
 * Show의 리스트를 반환할 때, 간략한 정보만 넣어서 반환할 수 있도록 한 DTO 클래스
 */
@Data
public class ShowListResponse {

	private Long showId;

	private String title;

	/**
	 * 상영 날짜
	 */
	private LocalDate date;

	/**
	 * 공연 썸네일
	 */
	private String thumbnail;

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

	private LocalDate startTime;

	private LocalDate endTime;

	public ShowListResponse(ShowEntity show) {
		showId = show.getShowId();
		title = show.getTitle();
		date = show.getDate();
		thumbnail = show.getThumbnail();
		showProgress = show.getShowProgress();
		category_id = show.getCategory().getCategoryId();
		user_id = show.getUser().getUserId();
		nickname = show.getUser().getNickname();
		startTime = LocalDate.from(show.getStartTime());
		endTime = LocalDate.from(show.getEndTime());

	}
}
