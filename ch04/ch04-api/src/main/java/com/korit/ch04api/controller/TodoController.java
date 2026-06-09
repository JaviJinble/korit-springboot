package com.korit.ch04api.controller;

import com.korit.ch04api.dto.ApiResponse;
import com.korit.ch04api.dto.TodoReqDto;
import com.korit.ch04api.dto.TodoRespDto;
import com.korit.ch04api.security.PrioncipalUser;
import com.korit.ch04api.service.TodoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("/api/todos")
@RestController
@RequiredArgsConstructor
public class TodoController {

    private final TodoService todoService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<TodoRespDto>>> getTodos(
            @AuthenticationPrincipal PrioncipalUser principalUser
    ) {
        Long userId = principalUser.getUser().getId();
        return ResponseEntity.ok(ApiResponse.success(todoService.getTodos(userId)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<TodoRespDto>> addTodo(
            @AuthenticationPrincipal PrioncipalUser principalUser,
            @Valid @RequestBody TodoReqDto reqDto
    ) {
        Long userId = principalUser.getUser().getId();
        return ResponseEntity.ok(ApiResponse.success(todoService.addTodo(userId, reqDto)));
    }

    @PatchMapping("/{todoId}/toggle")
    public ResponseEntity<ApiResponse<Void>> toggleTodoStatus(
            @AuthenticationPrincipal PrioncipalUser principalUser,
            @PathVariable Long todoId
    ) {
        Long userId = principalUser.getUser().getId();
        todoService.toggleStatus(userId, todoId);
        return ResponseEntity.ok(ApiResponse.success());
    }
}
