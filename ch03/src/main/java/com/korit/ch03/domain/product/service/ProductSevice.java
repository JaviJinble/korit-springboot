package com.korit.ch03.domain.product.service;

import com.korit.ch03.common.exception.CategoryNotFoundException;
import com.korit.ch03.common.exception.DuplicatedException;
import com.korit.ch03.domain.product.dto.ProductReqCreate;
import com.korit.ch03.domain.product.dto.ProductResp;
import com.korit.ch03.domain.user.dto.UserResp;
import com.korit.ch03.entity.Category;
import com.korit.ch03.entity.Product;
import com.korit.ch03.mapper.CategoryMapper;
import com.korit.ch03.mapper.ProductMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductSevice {
    private final ProductMapper productMapper;
    private final CategoryMapper categoryMapper;

    public ProductResp create(ProductReqCreate dto) {
        Product foundProduct = productMapper.selectByProductName(dto.getProductName());
        Category category = categoryMapper.selectById(dto.getCategoryId());

        if (foundProduct != null) {
            throw new DuplicatedException("상품명이 이미 존재합니다.", "productName", dto.getProductName());
        }

        if(category == null) {
            throw new CategoryNotFoundException();
        }


        Product newProduct = Product.builder()
                .productName(dto.getProductName())
                .categoryId(dto.getCategoryId())
                .price(dto.getPrice())
                .build();

        productMapper.insert(newProduct);


        return ProductResp.builder()
                .id(newProduct.getId())
                .productName(newProduct.getProductName())
                .price(newProduct.getPrice())
                .categoryId(newProduct.getCategoryId())
                .createdAt(newProduct.getCreatedAt())
                .updatedAt(newProduct.getUpdatedAt())
                .build();
    }

    public List<ProductResp> getAll() {
        List<Product> products = productMapper.selectAll();
        return products.stream()
                .map(product -> ProductResp.builder()
                        .id(product.getId())
                        .productName(product.getProductName())
                        .price(product.getPrice())
                        .categoryId(product.getCategoryId())
                        .createdAt(product.getCreatedAt())
                        .updatedAt(product.getUpdatedAt())
                        .build())
                .toList();
    }

    public ProductResp getOne(Long productId) {
        Product product = productMapper.selectById(productId);

        return ProductResp.builder()
                .id(product.getId())
                .productName(product.getProductName())
                .price(product.getPrice())
                .categoryId(product.getCategoryId())
                .createdAt(product.getCreatedAt())
                .updatedAt(product.getUpdatedAt())
                .build();
    }

    public ProductResp getProductName(String productName) {
        Product product = productMapper.selectByProductName(productName);

        return ProductResp.builder()
                .id(product.getId())
                .productName(product.getProductName())
                .price(product.getPrice())
                .categoryId(product.getCategoryId())
                .createdAt(product.getCreatedAt())
                .updatedAt(product.getUpdatedAt())
                .build();
    }
}
