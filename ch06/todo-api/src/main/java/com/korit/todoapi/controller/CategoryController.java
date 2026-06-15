package com.korit.todoapi.controller;

import com.korit.todoapi.dto.category.CreateCategoryRequest;
import com.korit.todoapi.dto.category.UpdateCategoryRequest;
import com.korit.todoapi.entity.CategoryCompletionCounts;
import com.korit.todoapi.mapper.CategoryMapper;
import com.korit.todoapi.service.CategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;
    private final CategoryMapper categoryMapper;

    @GetMapping("/count/completion/not")
    public ResponseEntity<?> notCompleted(@AuthenticationPrincipal Long userId) {

        return ResponseEntity.ok(categoryService.getCategoryCompletionCounts(userId));
    }


    @GetMapping
    public ResponseEntity<?> getCategories(@AuthenticationPrincipal Long userId) {
        return ResponseEntity.ok(categoryService.getCategories(userId));
    }

    @PostMapping
    public ResponseEntity<?> createCategory(@AuthenticationPrincipal Long userId, @Valid @RequestBody CreateCategoryRequest request) {
        return ResponseEntity.ok(categoryService.create(userId, request));
    }

    @PutMapping("update/{categoryId}")
    public ResponseEntity<?> updateCategory(@AuthenticationPrincipal Long userId, @PathVariable Long categoryId, @Valid @RequestBody UpdateCategoryRequest request) {
        return ResponseEntity.ok(categoryService.update(userId, categoryId, request));
    }

    @DeleteMapping("delete/{categoryId}")
    public ResponseEntity<?> deletCategory(@AuthenticationPrincipal Long userId, @PathVariable Long categoryId) {
        categoryService.delete(userId, categoryId);
        return ResponseEntity.ok().build();
    }
}
