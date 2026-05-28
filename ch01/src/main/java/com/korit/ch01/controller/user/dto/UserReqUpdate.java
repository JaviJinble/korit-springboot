package com.korit.ch01.controller.user.dto;

import lombok.Data;

@Data
public class UserReqUpdate {
    private String password;
    private String confirmPassword;
    private String email;
}
