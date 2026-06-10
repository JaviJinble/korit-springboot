package com.korit.ch05api.mapper;

import com.korit.ch05api.entity.User;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
    int insert(User user);

    User selectByProviderId(String providerId);
    User selectById(Long userId);
}
