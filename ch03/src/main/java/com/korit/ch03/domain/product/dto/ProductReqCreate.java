package com.korit.ch03.domain.product.dto;

import lombok.Data;

@Data
public class ProductReqCreate {
    private String productName;
    private Long categoryId;
    private int price;
}
