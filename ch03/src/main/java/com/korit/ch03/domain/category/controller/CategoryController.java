package com.korit.ch03.domain.category.controller;

import com.korit.ch03.common.dto.ApiResponse;
import com.korit.ch03.domain.category.dto.CategoryReqCreate;
import com.korit.ch03.domain.category.dto.CategoryResp;
import com.korit.ch03.domain.category.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/categories")
@RestController
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @PostMapping
    public ResponseEntity<ApiResponse> create(@RequestBody CategoryReqCreate dto) {
        categoryService.create(dto);
        return ResponseEntity.ok(ApiResponse.ok());
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<CategoryResp>>> getAll() {
        return ResponseEntity.ok(ApiResponse.ok(categoryService.getAll()));
    }

    @GetMapping("/{categoryId}")
    public ResponseEntity<ApiResponse<CategoryResp>> getOne(@PathVariable Long categoryId) {
        return ResponseEntity.ok(ApiResponse.ok(categoryService.getOne(categoryId)));
    }
}
