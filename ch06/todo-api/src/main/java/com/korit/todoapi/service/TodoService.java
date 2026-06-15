package com.korit.todoapi.service;

import com.korit.todoapi.common.exception.TodoNotFoundException;
import com.korit.todoapi.dto.todo.CreateTodoRequest;
import com.korit.todoapi.dto.todo.TodoSearchCondition;
import com.korit.todoapi.dto.todo.UpdateTodoRequest;
import com.korit.todoapi.entity.Todo;
import com.korit.todoapi.mapper.TodoMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TodoService {
    private final TodoMapper todoMapper;

    public Todo create (Long userId, CreateTodoRequest request) {
        Todo todo = Todo.builder()
                .userId(userId)
                .categoryId(request.getCategoryId())
                .title(request.getTitle())
                .memo(request.getMemo())
                .dueDate(request.getDueDate())
                .dueTime(request.getDueTime())
                .priority(request.getPriority())
                .flagged(false)
                .completed(false)
                .createAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        todoMapper.insert(todo);

        return todo;
    }

    public List<Todo> getTodos (Long userId, TodoSearchCondition condition) {
        return todoMapper.selectAllByUserIdAndCondition(userId, condition);
    }

    public Todo update (Long userId, Long todoId, UpdateTodoRequest request) {
        Todo todo = todoMapper.selectByIdAndUserId(todoId, userId);

        if (todo == null) {
            throw new TodoNotFoundException("존재하지 않습니다");
        }

        todo.setCategoryId(request.getCategoryId());
        todo.setTitle(request.getTitle());
        todo.setMemo(request.getMemo());

        return null;
    }

    public void delete (Long userId, Long todoId) {
        Todo todo = todoMapper.selectByIdAndUserId(userId, todoId);

        if (todo == null) {
            throw new TodoNotFoundException("");
        }

        todoMapper.deleteByIdAndUserId(todoId, userId);
    }



    public Todo updateComplete(Long userId, Long todoId, UpdateTodoRequest request) {
        Todo todo = todoMapper.selectByIdAndUserId(todoId, userId);

        if (todo == null) {
            throw new TodoNotFoundException("할 일을 찾을 수 없습니다.");
        }

        todo.setCompleted(request.isCompleted());
        todo.setCompletedAt(request.isCompleted() ? LocalDateTime.now() : null);
        todo.setUpdatedAt(LocalDateTime.now());

        todoMapper.updateComplete(todo);

        return todo;
    }

    public Todo updateFlag(Long userId, Long todoId, UpdateTodoRequest request) {
        Todo todo = todoMapper.selectByIdAndUserId(todoId, userId);

        if (todo == null) {
            throw new TodoNotFoundException("할 일을 찾을 수 없습니다.");
        }

        todo.setFlagged(request.isFlagged());
        todo.setUpdatedAt(LocalDateTime.now());

        todoMapper.updateFlag(todo);

        return todo;
    }

}
