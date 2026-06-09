package com.korit.ch05api.mapper;

import com.korit.ch05api.entity.Role;
import com.korit.ch05api.entity.Role;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface RoleMapper {
    int insert(Role role);
    int insertMany(List<Role> roles);
}
