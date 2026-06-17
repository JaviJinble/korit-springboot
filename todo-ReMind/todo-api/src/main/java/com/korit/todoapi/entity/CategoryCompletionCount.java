package com.korit.todoapi.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryCompletionCount {
    private Long id;
    private int totalCount;
    private int notCompletedCount;
}
