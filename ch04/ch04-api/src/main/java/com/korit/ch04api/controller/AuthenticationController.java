package com.korit.ch04api.controller;

import com.korit.ch04api.dto.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import com.korit.ch04api.service.AuthenticationService;
import com.korit.ch04api.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/auth")
@RestController
@RequiredArgsConstructor
@Tag(name = "Authentication", description = "회원가입 및 로그인 API")
public class AuthenticationController {
    private final UserService userService;
    private final AuthenticationService authenticationService;


    @Operation(summary = "회원가입", description = "일반 사용자 계정을 생성합니다.")
    @ApiResponses({
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "성공 - 생성된 사용자 ID를 ApiResponse<CreateResponse> 형식으로 반환합니다.",
                    content = @Content(schema = @Schema(implementation = ApiResponse.class))),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "실패 또는 Validation 오류 - 중복 아이디/이메일 또는 요청 값 검증 실패입니다.",
                    content = @Content(schema = @Schema(implementation = ApiResponse.class)))
    })
    @PostMapping("/users")
    public ResponseEntity<ApiResponse<CreateResponse>> singUp(@Valid @RequestBody AuthUserCreateRequest dto) {

        return ResponseEntity.ok(ApiResponse.success(userService.authCreate(dto)));
    }

    @Operation(summary = "로그인", description = "아이디와 비밀번호로 JWT Access Token을 발급합니다.")
    @ApiResponses({
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "성공 - JWT 토큰을 ApiResponse<TokenResponse> 형식으로 반환합니다.",
                    content = @Content(schema = @Schema(implementation = ApiResponse.class))),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Validation 오류 - 요청 값 검증 실패입니다.",
                    content = @Content(schema = @Schema(implementation = ApiResponse.class))),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "인증 오류 - 아이디 또는 비밀번호가 올바르지 않습니다.",
                    content = @Content(schema = @Schema(implementation = ApiResponse.class)))
    })
    @PostMapping("/users/token")
    public ResponseEntity<ApiResponse<TokenResponse>> signIn(@Valid @RequestBody AuthUserTokenRequest dto) {

        return ResponseEntity.ok(ApiResponse.success(authenticationService.authenticate(dto)));
    }
}
