package com.korit.ch04api.controller;

import com.korit.ch04api.dto.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/customers")
@RestController
public class CustomerController {

    @GetMapping
    public ResponseEntity<ApiResponse> get() {
        return ResponseEntity.ok(ApiResponse.success());
    }
}
