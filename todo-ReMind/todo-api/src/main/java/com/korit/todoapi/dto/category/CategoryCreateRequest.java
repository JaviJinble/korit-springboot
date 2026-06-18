package com.korit.todoapi.dto.category;

import com.korit.todoapi.entity.Category;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CategoryCreateRequest {
    private Long userId;
    private String name;
    private Long colorId;
    private Long iconId;

    public Category toCategory() {
        return Category.builder()
                .userId(userId)
                .name(name)
                .colorId(colorId)
                .iconId(iconId)
                .createdAt(LocalDateTime.now())
                .build();
    }
}
