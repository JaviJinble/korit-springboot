package com.korit.todoapi.mapper;

import com.korit.todoapi.entity.User;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
    int insert(User user);
    User selectByProviderId(String providerId);
    User selectById(Long userId);
}
