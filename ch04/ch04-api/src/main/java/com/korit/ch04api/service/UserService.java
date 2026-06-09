package com.korit.ch04api.service;

import com.korit.ch04api.common.exception.DuplicatedException;
import com.korit.ch04api.dto.ApiResponse;
import com.korit.ch04api.dto.AuthUserCreateRequest;
import com.korit.ch04api.dto.AuthUserResp;
import com.korit.ch04api.dto.CreateResponse;
import com.korit.ch04api.dto.ProfileUpdateReqDto;
import com.korit.ch04api.entity.User;
import com.korit.ch04api.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserMapper userMapper;
    private final BCryptPasswordEncoder passwordEncoder;

    public CreateResponse authCreate(AuthUserCreateRequest dto) {
        User foundUser = userMapper.selectByUsername(dto.getUsername());

        if (foundUser != null) {
            throw new DuplicatedException("username 필드 중복. 이미 사용중인 아이디입니다.", "username", dto.getUsername());
        }

        User userEntity = dto.toUser(passwordEncoder);
        userMapper.insert(userEntity);

        return CreateResponse.builder()
                .domainName("user")
                .createdIds(List.of(userEntity.getId()))
                .build();
    }

    public AuthUserResp getMe(Long userId) {
        User user = userMapper.selectById(userId);
        return toAuthUserResp(user);
    }

    @Transactional(rollbackFor = Exception.class)
    public AuthUserResp updateProfile(Long userId, ProfileUpdateReqDto reqDto) {
        User foundUser = userMapper.selectByEmailExceptUserId(reqDto.getEmail(), userId);

        if (foundUser != null) {
            throw new DuplicatedException("이미 사용 중인 이메일입니다.", "email", reqDto.getEmail());
        }

        userMapper.updateProfile(userId, reqDto.getName(), reqDto.getEmail(), reqDto.getBio());
        return getMe(userId);
    }

    private AuthUserResp toAuthUserResp(User user) {
        String roleName = user.getRole() == null ? null : user.getRole().getRoleName();

        return AuthUserResp.builder()
                .id(user.getId())
                .username(user.getUsername())
                .name(user.getName())
                .email(user.getEmail())
                .bio(user.getBio())
                .role(roleName)
                .build();
    }
}
