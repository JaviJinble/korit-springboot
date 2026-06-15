package com.korit.todoapi.dto.todo;

import lombok.Data;

import java.time.LocalDate;

@Data
public class TodoSearchCondition {
    private Long categoryId;
    private Boolean completed;
    private LocalDate date;
}
