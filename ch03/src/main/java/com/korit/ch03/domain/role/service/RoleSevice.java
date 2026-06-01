package com.korit.ch03.domain.role.service;

import com.korit.ch03.common.exception.DuplicatedException;
import com.korit.ch03.domain.role.dto.RoleReqCreate;
import com.korit.ch03.domain.role.dto.RoleResp;
import com.korit.ch03.entity.Role;
import com.korit.ch03.domain.role.mapper.RoleMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service // 5
@RequiredArgsConstructor // 10
public class RoleSevice { // 4
    private final RoleMapper roleMapper; // 9

    public RoleResp create(RoleReqCreate dto) {
        Role foundRole = roleMapper.selectByRolename(dto.getRoleName());

        if (foundRole != null){
            throw new DuplicatedException("roleName이 중복입니다.", "roleName", dto.getRoleName());
        }

        System.out.println("service: " + dto);

        Role newRole = Role.builder()
                .roleName(dto.getRoleName())
                .build();

        roleMapper.insert(newRole);

        return RoleResp.builder()
                .id(newRole.getId())
                .roleName(newRole.getRoleName())
                .build();
    }
    // 전체 조회
    public List<RoleResp> getAll() {
        return roleMapper.findAll().stream()
                .map(role -> RoleResp.builder()
                        .id(role.getId())
                        .roleName(role.getRoleName())
                        .createdAt(role.getCreatedAt())
                        .updatedAt(role.getUpdatedAt())
                        .build())
                .toList();
    }

    // 단건 조회
    public RoleResp getRole(long id) {
        Role role = roleMapper.findById(id);

        return RoleResp.builder()
                .id(role.getId())
                .roleName(role.getRoleName())
                .createdAt(role.getCreatedAt())
                .updatedAt(role.getUpdatedAt())
                .build();
    }
}
