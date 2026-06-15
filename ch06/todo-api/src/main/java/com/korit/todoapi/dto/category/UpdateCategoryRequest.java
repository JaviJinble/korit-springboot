package com.korit.todoapi.dto.category;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UpdateCategoryRequest {
    private Long id;
    private Long userId;
    @NotBlank(message = "카테고리 이름은 필수 입니다.")
    private String name;
    private String color;
    private String icon;
}
