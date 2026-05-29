package com.korit.ch03.mapper;

import com.korit.ch03.entity.User;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
    int insert(User user);

}
