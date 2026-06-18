package com.korit.todoapi.dto.category;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CategoryResponse {
    private Long categoryId;
    private String categoryName;
    private Long categoryColorId;
    private String categoryColor;
    private Long categoryIconId;
    private String categoryIcon;
}
