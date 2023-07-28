package com.sandcastle.immerse.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sandcastle.immerse.model.entity.CategoryEntity;
import com.sandcastle.immerse.repository.CategoryRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CategoryService {

	private final CategoryRepository categoryRepository;

	public List<CategoryEntity> findCategories() {
		return categoryRepository.findAll();
	}

	public Optional<CategoryEntity> findCategory(Long id) {
		return categoryRepository.findById(id);
	}

	@Transactional(readOnly = false)
	public Long postCategory(CategoryEntity category) {
		return categoryRepository.save(category).getCategoryId();
	}
}
