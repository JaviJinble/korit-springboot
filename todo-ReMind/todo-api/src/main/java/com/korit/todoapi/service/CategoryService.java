package com.korit.todoapi.service;

import com.korit.todoapi.common.exception.DuplicatedException;
import com.korit.todoapi.dto.CreateResponse;
import com.korit.todoapi.dto.category.CategoryCreateRequest;
import com.korit.todoapi.dto.category.CategoryModifyRequest;
import com.korit.todoapi.dto.category.CategoryResponse;
import com.korit.todoapi.entity.Category;
import com.korit.todoapi.entity.CategoryCompletionCount;
import com.korit.todoapi.mapper.CategoryMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryMapper categoryMapper;

    private void checkDuplicated(String categoryName, Long userId) {
        Category category = categoryMapper.selectByNameAndUserId(categoryName, userId);
        if (category != null) throw new DuplicatedException("이미 존재하는 카테고리입니다.", "name", categoryName);
    }

    public CreateResponse create(CategoryCreateRequest dto) {
        checkDuplicated(dto.getName(), dto.getUserId());
        Category category = dto.toCategory();
        categoryMapper.insert(category);

        return CreateResponse.builder()
                .domainName("category")
                .createdIds(List.of(category.getId()))
                .build();
    }

    public List<CategoryResponse> getAll(Long userId) {
        return categoryMapper.selectAllByUserId(userId)
                .stream()
                .map(Category::toResponse)
                .toList();
    }

    public void modify(CategoryModifyRequest dto) {
        checkDuplicated(dto.getName(), dto.getUserId());
        categoryMapper.update(dto.toCategory());
    }

    public void delete(Long categoryId) {
        categoryMapper.delete(categoryId);
    }

    public List<CategoryCompletionCount> getNotCompletedCount(Long userId) {
        return categoryMapper.countNotCompletedByUserId(userId);
    }

}












