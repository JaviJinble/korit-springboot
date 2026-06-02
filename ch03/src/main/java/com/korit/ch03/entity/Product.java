package com.korit.ch03.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    private Long id;
    private String productName;
    private Long categoryId;
    private int price;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    private Category category;
}
