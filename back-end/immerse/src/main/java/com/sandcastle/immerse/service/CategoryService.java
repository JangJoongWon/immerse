package com.sandcastle.immerse.service;

import java.util.List;
import java.util.Optional;

import org.springframework.transaction.annotation.Transactional;

import com.sandcastle.immerse.model.dto.CategoryDto;

@Transactional(readOnly = true)
public interface CategoryService {

	public List<CategoryDto> findCategories();

	public Optional<CategoryDto> findCategory(Long id);

	@Transactional(readOnly = false)
	public Long postCategory(CategoryDto category);
}
