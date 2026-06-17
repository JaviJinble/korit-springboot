package com.korit.todoapi.controller;

import com.korit.todoapi.dto.ApiResponse;
import com.korit.todoapi.dto.CreateResponse;
import com.korit.todoapi.dto.todo.TodoCompletionRequest;
import com.korit.todoapi.dto.todo.TodoCreateRequest;
import com.korit.todoapi.dto.todo.TodoModifyRequest;
import com.korit.todoapi.dto.todo.TodoResponse;
import com.korit.todoapi.entity.Todo;
import com.korit.todoapi.service.TodoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/todos")
@RequiredArgsConstructor
public class TodoController {
    private final TodoService todoService;

    @PostMapping
    public ResponseEntity<ApiResponse<CreateResponse>> create(@RequestBody TodoCreateRequest dto) {
        return ResponseEntity.ok(ApiResponse.success(todoService.create(dto)));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<TodoResponse>>> getAll(@AuthenticationPrincipal Long userId) {
        return ResponseEntity.ok(ApiResponse.success(todoService.getAll(userId)));
    }
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> modify(@RequestBody TodoModifyRequest dto) {
        todoService.modify(dto);
        return ResponseEntity.ok(ApiResponse.success("수정 완료"));
    }

    @PatchMapping("/{id}/complete")
    public ResponseEntity<ApiResponse<?>> complete(@RequestBody TodoCompletionRequest dto) {
        todoService.complete(dto);
        return ResponseEntity.ok(ApiResponse.success("완료 상태 변경 완료"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> delete(@PathVariable Long id) {
        todoService.delete(id);
        return ResponseEntity.ok(ApiResponse.success("삭제 완료"));
    }
}
