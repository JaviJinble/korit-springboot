package com.korit.ch03.domain.product.controller;

import com.korit.ch03.common.dto.ApiResponse;
import com.korit.ch03.domain.product.dto.ProductReqCreate;
import com.korit.ch03.domain.product.dto.ProductResp;
import com.korit.ch03.domain.product.service.ProductSevice;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {
    private final ProductSevice productSevice;


    @PostMapping
    public ResponseEntity<ApiResponse> create(@RequestBody ProductReqCreate dto) {
        productSevice.create(dto);
        return ResponseEntity.ok(ApiResponse.ok());
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<ProductResp>>> getAll() {
        return ResponseEntity.ok(ApiResponse.ok(productSevice.getAll()));
    }

    @GetMapping("/{productId}")
    public ResponseEntity<ApiResponse> getOnd(@PathVariable Long productId) {
        return ResponseEntity.ok(ApiResponse.ok(productSevice.getOne(productId)));
    }

    @GetMapping("/productnames/{productName}")
    public ResponseEntity<ApiResponse> getProductName(@PathVariable String productName) {
        return ResponseEntity.ok(ApiResponse.ok(productSevice.getProductName(productName)));
    }

}
