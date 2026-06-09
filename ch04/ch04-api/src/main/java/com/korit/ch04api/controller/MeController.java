package com.korit.ch04api.controller;

import com.korit.ch04api.dto.ApiResponse;
import com.korit.ch04api.dto.AuthUserResp;
import com.korit.ch04api.entity.User;
import com.korit.ch04api.security.PrioncipalUser;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/me")
@RestController
public class MeController {

    @GetMapping
    public ResponseEntity<ApiResponse<AuthUserResp>> getMe(
            @AuthenticationPrincipal PrioncipalUser principalUser
    ) {
        User user = principalUser.getUser();
        String roleName = user.getRole() == null ? null : user.getRole().getRoleName();

        AuthUserResp response = AuthUserResp.builder()
                .id(user.getId())
                .username(user.getUsername())
                .name(user.getName())
                .email(user.getEmail())
                .role(roleName)
                .build();

        return ResponseEntity.ok(ApiResponse.success(response));
    }
}
