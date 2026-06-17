package com.korit.todoapi.dto.todo;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
@Builder
public class TodoResponse {
    private Long todoId;
    private Long userId;
    private Long categoryId;
    private String title;
    private String memo;
    private LocalDate dueDate;
    private LocalTime dueTime;
    private int priority;
    private boolean isFlagged ;
    private boolean isCompleted;
    private LocalDateTime completedAt;
}
