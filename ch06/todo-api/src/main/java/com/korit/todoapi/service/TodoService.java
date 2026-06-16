package com.korit.todoapi.service;

import com.korit.todoapi.common.exception.TodoNotFoundException;
import com.korit.todoapi.dto.todo.*;
import com.korit.todoapi.entity.Todo;
import com.korit.todoapi.mapper.TodoMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TodoService {
    private final TodoMapper todoMapper;

    public Todo create(Long userId, CreateTodoRequest request) {
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
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        todoMapper.insert(todo);

        return todo;
    }

    public List<TodoResponse> getAll(Long userId) {
        return todoMapper.selectAll().stream().map(Todo::todoResponse).toList();
    }


    public List<Todo> getTodos(Long userId, TodoSearchCondition condition) {
        return todoMapper.selectAllByUserIdAndCondition(userId, condition);
    }

//    public void complete(TodoCompletionRequest dto) {
//        todoMapper.updateComplete(dto.getTodoId(), dto.isCompleted());
//    }

    public void modify(TodoModifyRequest dto) {
        todoMapper.update(dto.toTodo());
    }

    public void delete(Long todoId) {
        todoMapper.delete(todoId);
    }

    public Todo update(Long userId, Long todoId, UpdateTodoRequest request) {
        Todo todo = todoMapper.selectByIdAndUserId(todoId, userId);

        if (todo == null) {
            throw new TodoNotFoundException("Todo not found.");
        }

        todo.setCategoryId(request.getCategoryId());
        todo.setTitle(request.getTitle());
        todo.setMemo(request.getMemo());
        todo.setDueDate(request.getDueDate());
        todo.setDueTime(request.getDueTime());
        todo.setPriority(request.getPriority());
        todo.setUpdatedAt(LocalDateTime.now());

        todoMapper.update(todo);

        return todo;
    }

    public void delete(Long userId, Long todoId) {
        Todo todo = todoMapper.selectByIdAndUserId(todoId, userId);

        if (todo == null) {
            throw new TodoNotFoundException("Todo not found.");
        }

        todoMapper.deleteByIdAndUserId(todoId, userId);
    }

    public Todo updateComplete(Long userId, Long todoId, UpdateTodoRequest request) {
        Todo todo = todoMapper.selectByIdAndUserId(todoId, userId);

        if (todo == null) {
            throw new TodoNotFoundException("Todo not found.");
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
            throw new TodoNotFoundException("Todo not found.");
        }

        todo.setFlagged(request.isFlagged());
        todo.setUpdatedAt(LocalDateTime.now());

        todoMapper.updateFlag(todo);

        return todo;
    }
}
