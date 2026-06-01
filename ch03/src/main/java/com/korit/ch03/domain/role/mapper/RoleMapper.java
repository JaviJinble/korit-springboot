package com.korit.ch03.domain.role.mapper;

import com.korit.ch03.entity.Role;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper // 7
public interface RoleMapper { // 6
    int insert(Role role);

    List<Role> findAll();

    Role findById(Long id);

    Role selectByRolename(String roleName);

}
