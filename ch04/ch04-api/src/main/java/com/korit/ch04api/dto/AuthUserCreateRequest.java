package com.korit.ch04api.dto;

import com.korit.ch04api.entity.User;
import lombok.Data;

@Data
public class AuthUserCreateRequest {
    private String username;
    private String password;
    private String name;
    private String email;
    private Long roleId = 1l;

    public User toUser() {
        return User.builder()
                .username(username)
                .password(password)
                .name(name)
                .email(email)
                .roleId(roleId)
                .build();
    }
}
