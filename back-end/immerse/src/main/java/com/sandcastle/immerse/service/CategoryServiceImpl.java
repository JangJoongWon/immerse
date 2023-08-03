package com.sandcastle.immerse.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sandcastle.immerse.model.dto.CategoryDto;
import com.sandcastle.immerse.model.entity.CategoryEntity;
import com.sandcastle.immerse.repository.CategoryRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

	private final CategoryRepository categoryRepository;

	public List<CategoryDto> findCategories() {
		List<CategoryEntity> categories = categoryRepository.findAll();
		return categories.stream().map(CategoryDto::new).collect(Collectors.toList());
	}

	public Optional<CategoryDto> findCategory(Long id) {
		CategoryEntity e = categoryRepository.findById(id)
			.orElseThrow(() -> new IllegalArgumentException("does not exist!"));
		return Optional.of(new CategoryDto(e));
	}

	@Transactional(readOnly = false)
	public Long postCategory(CategoryDto req) {
		CategoryEntity category = CategoryEntity.builder()
			.categoryName(req.getCategoryName())
			.categoryThumbnail(req.getCategoryThumbnail())
			.defaultThumbnail(req.getDefaultThumbnail())
			.build();
		return categoryRepository.save(category).getCategoryId();
	}
}
