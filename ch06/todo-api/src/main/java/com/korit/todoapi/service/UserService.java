package com.korit.todoapi.service;

import com.korit.todoapi.dto.user.MeResponse;
import com.korit.todoapi.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserMapper userMapper;

    public MeResponse getMe(Long userId) {
        return userMapper.selectById(userId).toMe();
    }
}
