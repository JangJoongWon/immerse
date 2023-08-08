package com.sandcastle.immerse.model.dto.show;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import com.sandcastle.immerse.model.dto.ShowTagDto;
import com.sandcastle.immerse.model.entity.ShowEntity;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ShowRequest {

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

	private Long categoryId;

	private Long userId;

	private List<ShowTagDto> showTagDtoList;

	/**
	 * 작성자: 주재홍
	 * ISSUE: categoryId 외래 키를 갖고 있는 경우 외부 service 참조 없이
	 * 완전한 Entity 생성이 불가능함.
	 * DTO 안에서 CategoryService를 갖게 하는 것은 바람직하지 못한 설계라 생각됨.
	 * ShowService의 post 메서드 안에서 처리해주는 것이 더 좋을 것 같음.
	 * @return
	 */
	public ShowEntity toEntity() {
		return ShowEntity.builder()
			.showId(showId)
			.title(title)
			.startTime(startTime)
			.endTime(endTime)
			.date(date)
			.description(description)
			.thumbnail(thumbnail)
			.price(price)
			.attendanceLimit(attendanceLimit)
			.build();
	}
}
