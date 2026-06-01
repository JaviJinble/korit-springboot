package com.korit.ch03.domain.user.service;

import com.korit.ch03.common.exception.DuplicatedException;
import com.korit.ch03.domain.user.dto.UserReqCreate;
import com.korit.ch03.domain.user.dto.UserResp;
import com.korit.ch03.entity.Role;
import com.korit.ch03.entity.UserRole;
import com.korit.ch03.mapper.UserRoleMapper;
import com.korit.ch03.entity.User;
import com.korit.ch03.domain.user.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserSevice {
    private final UserMapper userMapper;
    private final UserRoleMapper userRoleMapper;

    public UserResp create(UserReqCreate dto) {
        User foundUser = userMapper.selectByUsername(dto.getUsername());

        if (foundUser != null) {
            throw new DuplicatedException("username이 중복입니다.", "username", dto.getUsername());
        }

        User newUser = User.builder()
                .username(dto.getUsername())
                .password(dto.getPassword())
                .name(dto.getName())
                .email(dto.getEmail())
                .build();

        userMapper.insert(newUser);

        UserRole userRole = UserRole.builder()
                .userId(newUser.getId())
                .roleId(1l)
                .build();

        userRoleMapper.insert(userRole);

        return UserResp.builder()
                .id(newUser.getId())
                .username(newUser.getUsername())
                .name(newUser.getName())
                .email(newUser.getEmail())
                .build();
    }

    public List<UserResp> getAll() {
        List<User> users = userMapper.selectAll();
        return users.stream()
                .map(user -> UserResp.builder()
                    .id(user.getId())
                    .username(user.getUsername())
                    .name(user.getName())
                    .email(user.getEmail())
                    .build())
                .toList();
    }

    public UserResp getOne(Long userId) {
        User user = userMapper.selectById(userId);

        return UserResp.builder()
                .id(user.getId())
                .username(user.getUsername())
                .name(user.getName())
                .email(user.getEmail())
                .roles(user.getUserRoles().stream()
                        .map(userRole -> {
                            Role role = userRole.getRole();
                            return new UserResp.Role(role.getId(), role.getRoleName());
                        })
                        .toList())
                .build();
    }

    public UserResp getUserName(String username) {
        User user = userMapper.selectByUsername(username);

        return UserResp.builder()
                .id(user.getId())
                .username(user.getUsername())
                .name(user.getName())
                .email(user.getEmail())
                .build();
    }
}
