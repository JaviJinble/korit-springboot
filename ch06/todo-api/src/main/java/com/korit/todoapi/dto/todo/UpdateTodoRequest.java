package com.korit.todoapi.dto.todo;

import lombok.Data;
import org.w3c.dom.Text;

import java.time.LocalDateTime;

@Data
public class UpdateTodoRequest {
    private Long categoryId;
    private String title;
    private String memo;
    private LocalDateTime dueDate;
    private LocalDateTime dueTime;
    private int priority;
    private boolean flagged;
    private boolean completed;
    private LocalDateTime updateAt;
}
