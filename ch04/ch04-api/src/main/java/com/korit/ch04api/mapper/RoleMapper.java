package com.korit.ch04api.mapper;

import com.korit.ch04api.entity.Role;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface RoleMapper {
    int insert(Role role);
    int insertMany(List<Role> roles);
}
