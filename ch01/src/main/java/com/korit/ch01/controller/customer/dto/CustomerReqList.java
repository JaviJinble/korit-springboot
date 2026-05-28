package com.korit.ch01.controller.customer.dto;

import lombok.Data;

@Data
public class CustomerReqList {
    private String query;
    private Integer userId;
    private String name;
    private String email;
    private String phoneE164;
}
