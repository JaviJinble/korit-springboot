package com.korit.todoapi.controller;

import com.korit.todoapi.dto.ApiResponse;
import com.korit.todoapi.dto.CreateResponse;
import com.korit.todoapi.dto.category.CategoryModifyRequest;
import com.korit.todoapi.dto.category.CreateCategoryRequest;
import com.korit.todoapi.dto.category.UpdateCategoryRequest;
import com.korit.todoapi.entity.Category;
import com.korit.todoapi.entity.CategoryCompletionCounts;
import com.korit.todoapi.service.CategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;

    @GetMapping("/count/completion/not")
    public ResponseEntity<ApiResponse<List<CategoryCompletionCounts>>> notCompleted(@AuthenticationPrincipal Long userId) {
        return ResponseEntity.ok(ApiResponse.success(categoryService.getNotCompletedCount(userId)));
    }

    @GetMapping
    public ResponseEntity<?> getCategories(@AuthenticationPrincipal Long userId) {
        return ResponseEntity.ok(categoryService.getCategories(userId));
    }

    @GetMapping("/{categoryId}")
    public ResponseEntity<ApiResponse<?>> getCategory(@AuthenticationPrincipal Long userId, @PathVariable Long categoryId) {
        return ResponseEntity.ok(ApiResponse.success(categoryService.getCategory(userId, categoryId)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Category>> createCategory(
            @AuthenticationPrincipal Long userId,
            @Valid @RequestBody CreateCategoryRequest request
    ) {
        return ResponseEntity.ok(ApiResponse.success(categoryService.create(userId, request)));
    }

    @PostMapping("post/create")
    public ResponseEntity<ApiResponse<CreateResponse>> create(@AuthenticationPrincipal Long userId, @RequestBody CreateCategoryRequest dto) {
        return ResponseEntity.ok(ApiResponse.success(categoryService.createOne(userId, dto)));
    }

    @PutMapping("update/{categoryId}")
    public ResponseEntity<ApiResponse<?>> updateCategory(
            @AuthenticationPrincipal Long userId,
            @PathVariable Long categoryId,
            @Valid @RequestBody UpdateCategoryRequest request
    ) {
        return ResponseEntity.ok(ApiResponse.success(categoryService.update(userId, categoryId, request)));
    }

    @PutMapping("{id}")
    public ResponseEntity<ApiResponse<?>> modify(
            @AuthenticationPrincipal Long userId,
            @PathVariable Long id,
            @RequestBody CategoryModifyRequest dto
    ) {
        return ResponseEntity.ok(ApiResponse.success(categoryService.modify(userId, id, dto)));
    }

    @DeleteMapping("/{categoryId}")
    public ResponseEntity<?> deleteCategory(@AuthenticationPrincipal Long userId, @PathVariable Long categoryId) {
        categoryService.delete(userId, categoryId);
        return ResponseEntity.ok().build();
    }
}
