package com.sandcastle.immerse.model.dto;

import com.sandcastle.immerse.model.entity.CategoryEntity;

import lombok.Builder;
import lombok.Data;

@Data
public class CategoryDto {

	private Long categoryId;

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

	@Builder
	public CategoryDto(Long categoryId, String categoryName, String categoryThumbnail, String defaultThumbnail) {
		this.categoryId = categoryId;
		this.categoryName = categoryName;
		this.categoryThumbnail = categoryThumbnail;
		this.defaultThumbnail = defaultThumbnail;
	}

	public CategoryDto(CategoryEntity e) {
		categoryId = e.getCategoryId();
		categoryName = e.getCategoryName();
		categoryThumbnail = e.getCategoryThumbnail();
		defaultThumbnail = e.getDefaultThumbnail();
	}
}
