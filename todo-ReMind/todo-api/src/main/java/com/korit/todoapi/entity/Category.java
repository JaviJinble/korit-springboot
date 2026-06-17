package com.korit.todoapi.entity;

import com.korit.todoapi.dto.category.CategoryResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Category {
    private Long id;
    private Long userId;
    private String name;
    private String color;
    private String icon;
    private LocalDateTime createdAt;

    public CategoryResponse toResponse() {
        return CategoryResponse.builder()
                .categoryId(id)
                .categoryName(name)
                .categoryColor(color)
                .categoryIcon(icon)
                .build();
    }
}
