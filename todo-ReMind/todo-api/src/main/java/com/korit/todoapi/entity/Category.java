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
    private Long colorId;
    private Long iconId;
    private LocalDateTime createdAt;

    private CategoryColor categoryColor;
    private CategoryIcon categoryIcon;

    public CategoryResponse toResponse() {
        return CategoryResponse.builder()
                .categoryId(id)
                .categoryName(name)
                .categoryColorId(colorId)
                .categoryColor(categoryColor != null ? categoryColor.getColor() : null)
                .categoryIconId(iconId)
                .categoryIcon(categoryIcon != null ? categoryIcon.getIcon() : null)
                .build();
    }
}
