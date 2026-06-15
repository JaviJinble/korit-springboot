package com.korit.todoapi.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Todo {
    private Long id;
    private Long userId;
    private Long categoryId;
    private String title;
    private String memo;
    private LocalDate dueDate;
    private LocalTime dueTime;
    private String priority;
    private boolean flagged;
    private boolean completed;
    private LocalDateTime completedAt;
    private LocalDateTime createAt;
    private LocalDateTime updatedAt;
}
