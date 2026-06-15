package com.korit.todoapi.service;

import com.korit.todoapi.common.exception.CategoryNotFoundException;
import com.korit.todoapi.common.exception.DuplicatedException;
import com.korit.todoapi.dto.category.CreateCategoryRequest;
import com.korit.todoapi.dto.category.UpdateCategoryRequest;
import com.korit.todoapi.entity.Category;
import com.korit.todoapi.entity.CategoryCompletionCounts;
import com.korit.todoapi.mapper.CategoryMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryMapper categoryMapper;

    public List<CategoryCompletionCounts> getCategoryCompletionCounts(Long userId) {
        return categoryMapper.countNotCompletedByUserId(userId);
    }

    public Category create(Long userId, CreateCategoryRequest request) {
        Category foundCategory = categoryMapper.selectByUserIdAndName(userId, request.getName());

        Category category = Category.builder()
                .userId(userId)
                .name(request.getName())
                .color(request.getColor())
                .icon(request.getIcon())
                .createdAt(LocalDateTime.now())
                .build();

        if (foundCategory != null) {
            throw new DuplicatedException("이미 존재하는 카테고리 이름입니다.", "name", request.getName());
        }

        if (userId == null) {
            throw new AuthenticationCredentialsNotFoundException("인증 정보가 없습니다.");
        }

        categoryMapper.insert(category);


        return category;
    }

    public List<Category> getCategories(Long userId) {
        return categoryMapper.selectAllByUserId(userId);
    }

    public Category update(Long userId, Long categoryId, UpdateCategoryRequest request) {
        Category category = categoryMapper.selectByIdAndUserId(categoryId, userId);
        Category foundCategory = categoryMapper.selectByUserIdAndName(userId, request.getName());

        if (category == null) {
            throw new CategoryNotFoundException();
        }

        if (foundCategory != null && !foundCategory.getId().equals(categoryId)) {
            throw new DuplicatedException("이미 존재하는 카테고리 이름입니다.", "name", request.getName());
        }

        category.setName(request.getName());
        category.setColor(request.getColor());
        category.setIcon(request.getIcon());

        categoryMapper.update(category);

        return category;
    }

    public void delete(Long userId, Long categoryId) {
        Category category = categoryMapper.selectByIdAndUserId(categoryId, userId);

        if(category == null) {
            throw new CategoryNotFoundException();
        }

        categoryMapper.deleteByIdAndUserId(categoryId, userId);
    }

}
