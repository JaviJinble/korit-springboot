package com.korit.ch04api.mapper;

import com.korit.ch04api.entity.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface UserMapper {
    int insert(User user);
    User selectByUsername(String username);
    User selectByEmailExceptUserId(@Param("email") String email, @Param("userId") Long userId);
    User selectById(Long userId);
    int updateProfile(
            @Param("userId") Long userId,
            @Param("name") String name,
            @Param("email") String email,
            @Param("bio") String bio
    );
}
