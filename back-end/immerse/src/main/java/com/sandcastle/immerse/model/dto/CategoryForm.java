package com.sandcastle.immerse.model.dto;

import lombok.Getter;

@Getter
public class CategoryForm {

	/**
	 * 카테고리 이름
	 */
	private String categoryName;

	/**
	 * 메인 페이지 카테고리 별 리스트 Carousel 대표 이미지
	 * 주소 형태로 저장, 별도의 미디어 파일 저장 서버로부터 로딩하기 위한 값
	 */
	private String categoryThumbnail;

	/**
	 * 각 카테고리 별 기본 썸네일 이미지 주소
	 * 별도의 이미지가 지정되지 않으면 이 주소의 이미지로 대체함
	 */
	private String defaultThumbnail;
}
