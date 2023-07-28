package com.sandcastle.immerse.model.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(name = "categories")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CategoryEntity {

	@Id
	@GeneratedValue
	@Column(name = "category_id")
	private Long categoryId;

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

	@JsonIgnore
	@OneToMany(mappedBy = "category")
	@Builder.Default
	private List<ShowEntity> shows = new ArrayList<>();

}
