package com.korit.todoapi.dto.todo;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.korit.todoapi.entity.Todo;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
public class TodoCreateRequest {
    private Long userId;
    private Long categoryId;
    private String title;
    private String memo;
    private LocalDate dueDate;
    private LocalTime dueTime;
    private int priority;
    @JsonProperty("isFlagged")
    private boolean isFlagged ;

    public Todo toTodo() {
        return Todo.builder()
                .userId(userId)
                .categoryId(categoryId)
                .title(title)
                .memo(memo)
                .dueDate(dueDate)
                .dueTime(dueTime)
                .priority(priority)
                .isFlagged(isFlagged)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();
    }
}
