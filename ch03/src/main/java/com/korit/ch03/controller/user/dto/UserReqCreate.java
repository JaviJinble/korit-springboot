package com.korit.ch03.controller.user.dto;

import lombok.Data;

@Data
public class UserReqCreate {
    private String username;
    private String password;
    private String name;
    private String email;
}
