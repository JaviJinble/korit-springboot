package com.korit.ch04api.service;

import com.korit.ch04api.dto.ApiResponse;
import com.korit.ch04api.dto.AuthUserCreateRequest;
import com.korit.ch04api.dto.AuthUserResp;
import com.korit.ch04api.entity.User;
import com.korit.ch04api.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserMapper userMapper;

    public ApiResponse<AuthUserResp> create(AuthUserCreateRequest dto) {

        User newUser = User.builder()
                .username(dto.getUsername())
                .password(dto.getPassword())
                .name(dto.getName())
                .email(dto.getEmail())
                .build();

        userMapper.insert(newUser);

        return ApiResponse.success(AuthUserResp.builder()
                .id(newUser.getId())
                .username(newUser.getUsername())
                .name(newUser.getName())
                .email(newUser.getEmail())
                .build()
        );
    }
}
