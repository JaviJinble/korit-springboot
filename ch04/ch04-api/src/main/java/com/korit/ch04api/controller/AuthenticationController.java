package com.korit.ch04api.controller;

import com.korit.ch04api.dto.ApiResponse;
import com.korit.ch04api.dto.AuthUserCreateRequest;
import com.korit.ch04api.dto.AuthUserResp;
import com.korit.ch04api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/auth")
@RestController
@RequiredArgsConstructor
public class AuthenticationController {
    private final UserService userService;

    @PostMapping("/users")
    public ResponseEntity<ApiResponse> singUp(@RequestBody AuthUserCreateRequest dto) {

        return ResponseEntity.ok(ApiResponse.success());
    }


}
