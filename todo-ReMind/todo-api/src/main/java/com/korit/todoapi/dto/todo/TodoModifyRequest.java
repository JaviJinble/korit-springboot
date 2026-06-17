package com.korit.todoapi.dto.todo;

import com.korit.todoapi.entity.Todo;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class TodoModifyRequest {
    private Long todoId;
    private Long userId;
    private Long categoryId;
    private String title;
    private String memo;
    private LocalDate dueDate;
    private LocalTime dueTime;
    private int priority;
    private boolean isFlagged ;

    public Todo toTodo() {
        return Todo.builder()
                .id(todoId)
                .userId(userId)
                .categoryId(categoryId)
                .title(title)
                .memo(memo)
                .dueDate(dueDate)
                .dueTime(dueTime)
                .priority(priority)
                .isFlagged(isFlagged)
                .build();
    }
}
