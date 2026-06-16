package com.korit.todoapi.controller;

import com.korit.todoapi.dto.ApiResponse;
import com.korit.todoapi.dto.todo.CreateTodoRequest;
import com.korit.todoapi.dto.todo.TodoSearchCondition;
import com.korit.todoapi.dto.todo.UpdateTodoRequest;
import com.korit.todoapi.entity.Todo;
import com.korit.todoapi.service.TodoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/todos")
@RequiredArgsConstructor
public class TodoController {

    private final TodoService todoService;

    @GetMapping
    public ResponseEntity<?> getTodos (@AuthenticationPrincipal Long userId, TodoSearchCondition condition) {
        return ResponseEntity.ok(todoService.getTodos(userId, condition));
    }

    @PostMapping
    public ResponseEntity<?> createTodo (@AuthenticationPrincipal Long userId, @Valid @RequestBody CreateTodoRequest request) {
        return ResponseEntity.ok(todoService.create(userId, request));
    }

    @PostMapping("/post/create")
    public ResponseEntity<ApiResponse<?>> create (@AuthenticationPrincipal Long userId, @RequestBody CreateTodoRequest dto) {
        return ResponseEntity.ok(ApiResponse.success(todoService.create(userId, dto)));
    }

    @PutMapping("{todoId}")
    public ResponseEntity<Todo> update (@AuthenticationPrincipal Long userId, @PathVariable Long todoId, @RequestBody UpdateTodoRequest request) {
        return ResponseEntity.ok(todoService.update(userId, todoId, request));
    }

    @PatchMapping("/{todoId}/complete")
    public ResponseEntity<?> updateComplete (@AuthenticationPrincipal Long userId, @PathVariable Long todoId, @RequestBody UpdateTodoRequest request) {

        return ResponseEntity.ok(todoService.updateComplete(userId, todoId, request));
    }

    @PutMapping("/{todoId}/flag")
    public ResponseEntity<?> updateFlag(@AuthenticationPrincipal Long userId, @PathVariable Long todoId, @RequestBody UpdateTodoRequest request) {

        return ResponseEntity.ok(todoService.updateFlag(userId, todoId, request));
    }

    @DeleteMapping("/{todoId}")
    public ResponseEntity<?> delete (@AuthenticationPrincipal Long userId, @PathVariable Long todoId) {
        todoService.delete(userId, todoId);
        return ResponseEntity.ok().build();
    }
}
