package com.korit.ch04api.controller;

import com.korit.ch04api.dto.ApiResponse;
import com.korit.ch04api.dto.AuthUserResp;
import com.korit.ch04api.dto.ProfileUpdateReqDto;
import com.korit.ch04api.security.PrioncipalUser;
import com.korit.ch04api.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/me")
@RestController
@RequiredArgsConstructor
public class MeController {

    private final UserService userService;

    @GetMapping
    public ResponseEntity<ApiResponse<AuthUserResp>> getMe(
            @AuthenticationPrincipal PrioncipalUser principalUser
    ) {
        Long userId = principalUser.getUser().getId();
        return ResponseEntity.ok(ApiResponse.success(userService.getMe(userId)));
    }

    @PutMapping
    public ResponseEntity<ApiResponse<AuthUserResp>> updateMe(
            @AuthenticationPrincipal PrioncipalUser principalUser,
            @Valid @RequestBody ProfileUpdateReqDto reqDto
    ) {
        Long userId = principalUser.getUser().getId();
        return ResponseEntity.ok(ApiResponse.success(userService.updateProfile(userId, reqDto)));
    }
}
