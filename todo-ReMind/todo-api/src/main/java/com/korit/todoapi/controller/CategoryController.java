package com.korit.todoapi.controller;

import com.korit.todoapi.dto.ApiResponse;
import com.korit.todoapi.dto.CreateResponse;
import com.korit.todoapi.dto.category.CategoryColorsAndIconsResponse;
import com.korit.todoapi.dto.category.CategoryCreateRequest;
import com.korit.todoapi.dto.category.CategoryModifyRequest;
import com.korit.todoapi.entity.CategoryCompletionCount;
import com.korit.todoapi.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;

    @PostMapping
    public ResponseEntity<ApiResponse<CreateResponse>> create(@RequestBody CategoryCreateRequest dto) {
        return ResponseEntity.ok(ApiResponse.success(categoryService.create(dto)));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<?>> getAll(@AuthenticationPrincipal Long userId) {
        return ResponseEntity.ok(ApiResponse.success(categoryService.getAll(userId)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> modify(@PathVariable Long id, @RequestBody CategoryModifyRequest dto) {
        categoryService.modify(dto);
        return ResponseEntity.ok(ApiResponse.success("수정 완료"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> delete(@PathVariable Long id) {
        categoryService.delete(id);
        return ResponseEntity.ok(ApiResponse.success("삭제 완료"));
    }

    @GetMapping("/count/completion/not")
    public ResponseEntity<ApiResponse<List<CategoryCompletionCount>>> notCompleted(@AuthenticationPrincipal Long userId) {
        return ResponseEntity.ok(ApiResponse.success(categoryService.getNotCompletedCount(userId)));
    }

    @GetMapping("/colors-icons")
    public ResponseEntity<ApiResponse<CategoryColorsAndIconsResponse>> getColorsAndIcons() {
        return ResponseEntity.ok(ApiResponse.success(categoryService.getColorsAndIcons()));
    }

}












