package com.korit.todoapi.dto.category;

import com.korit.todoapi.entity.Category;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CategoryModifyRequest {
    private Long userId;
    private String name;
    private String color;
    private String icon;

    public Category toCategory() {
        return Category.builder()
                .userId(userId)
                .name(name)
                .color(color)
                .icon(icon)
                .createdAt(LocalDateTime.now())
                .build();
    }
}
