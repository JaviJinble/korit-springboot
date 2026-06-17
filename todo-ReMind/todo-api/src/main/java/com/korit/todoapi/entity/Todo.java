package com.korit.todoapi.entity;

import com.korit.todoapi.dto.todo.TodoResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

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
    private int priority;
    private boolean isFlagged ;
    private boolean isCompleted;
    private LocalDateTime completedAt;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public TodoResponse toResponse() {
        return TodoResponse.builder()
                .todoId(id)
                .userId(userId)
                .categoryId(categoryId)
                .title(title)
                .memo(memo)
                .dueDate(dueDate)
                .dueTime(dueTime)
                .priority(priority)
                .isFlagged(isFlagged)
                .isCompleted(isCompleted)
                .completedAt(completedAt)
                .build();
    }
}
