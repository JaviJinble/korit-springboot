package com.korit.ch04api.dto;

import lombok.Data;

@Data
public class AuthUserCreateRequest {
    private String username;
    private String password;
    private String name;
    private String email;
}
