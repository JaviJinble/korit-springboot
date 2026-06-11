package com.korit.todoapi.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    @GetMapping
    public ResponseEntity<?> get(@AuthenticationPrincipal Long userId) {
//        Long userId = (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        return ResponseEntity.ok("카테고리 가지고 나감, userId: " + userId);
    }
}
