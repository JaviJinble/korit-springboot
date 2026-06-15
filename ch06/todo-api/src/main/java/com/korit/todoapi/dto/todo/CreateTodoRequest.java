package com.korit.todoapi.dto.todo;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class CreateTodoRequest {
    private Long categoryId;
    private String title;
    private String memo;
    private LocalDate dueDate;
    private LocalTime dueTime;
    private String priority;
}
