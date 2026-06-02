package com.korit.ch03.domain.category.service;

import com.korit.ch03.common.exception.DuplicatedException;
import com.korit.ch03.domain.category.dto.CategoryReqCreate;
import com.korit.ch03.domain.category.dto.CategoryResp;
import com.korit.ch03.entity.Category;
import com.korit.ch03.mapper.CategoryMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryMapper categoryMapper;

    public void create(CategoryReqCreate dto) {
        Category foundCategory = categoryMapper.selectByCategoryName(dto.getCategoryName());
        if (foundCategory != null) {
            throw new DuplicatedException("카테고리 이름이 이미존재합니다.", "categoryName", dto.getCategoryName());
        }
        Category newCategory = Category.builder()
                .categoryName(dto.getCategoryName())
                .build();

        categoryMapper.insert(newCategory);
    }

    public List<CategoryResp> getAll() {
        return categoryMapper.selectAll().stream()
                .map(category -> CategoryResp.builder()
                        .id(category.getId())
                        .categoryName(category.getCategoryName())
                        .createdAt(category.getCreatedAt())
                        .updatedAt(category.getUpdatedAt())
                        .build())
                .toList();
    }

    public CategoryResp getOne(Long categoryId) {
        Category foundCategory = categoryMapper.selectById(categoryId);
        return CategoryResp.builder()
                .id(foundCategory.getId())
                .categoryName(foundCategory.getCategoryName())
                .createdAt(foundCategory.getCreatedAt())
                .updatedAt(foundCategory.getUpdatedAt())
                .build();
    }

}
