package com.korit.ch03.domain.user.controller;

import com.korit.ch03.common.dto.ApiResponse;
import com.korit.ch03.domain.user.dto.UserReqCreate;
import com.korit.ch03.domain.user.dto.UserResp;
import com.korit.ch03.domain.user.service.UserSevice;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RequestMapping("/api/users")
@RestController
@RequiredArgsConstructor
public class UserController {
    private final UserSevice userSevice;

    @PostMapping
    public ResponseEntity<ApiResponse<UserResp>> create(@RequestBody UserReqCreate dto) {
    UserResp userResp = userSevice.create(dto);

        return ResponseEntity.ok(ApiResponse.ok(userResp));
    }

    // 다건(전체) 조회
    @GetMapping
    public ResponseEntity<ApiResponse<List<UserResp>>> getAll() {
        return ResponseEntity.ok(ApiResponse.ok(userSevice.getAll()));
    }

    // 단건 조회
    @GetMapping("/{userId}")
    public ResponseEntity<ApiResponse<UserResp>> getOne(@PathVariable long userId) {
        return ResponseEntity.ok(ApiResponse.ok(userSevice.getOne(userId)));
    }

    // 단건 조회(유저이름으로 검색)
    @GetMapping("/username/{username}")
    public ResponseEntity<ApiResponse<UserResp>> getUserName(@PathVariable String username) {
        return ResponseEntity.ok(ApiResponse.ok(userSevice.getUserName(username)));
    }
}
