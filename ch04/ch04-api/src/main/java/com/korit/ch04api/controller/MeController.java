package com.korit.ch04api.controller;

import com.korit.ch04api.dto.ApiResponse;
import com.korit.ch04api.dto.AuthUserResp;
import com.korit.ch04api.dto.ProfileUpdateReqDto;
import com.korit.ch04api.security.PrioncipalUser;
import com.korit.ch04api.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@Tag(name = "Me", description = "내 프로필 API")
public class MeController {

    private final UserService userService;

    @Operation(summary = "내 정보 조회", description = "JWT 인증 사용자 정보를 조회합니다.")
    @ApiResponses({
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "성공 - ApiResponse<AuthUserResp> 형식으로 반환합니다.", content = @Content(schema = @Schema(implementation = ApiResponse.class))),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "인증 오류 - JWT 토큰이 없거나 유효하지 않습니다.", content = @Content(schema = @Schema(implementation = ApiResponse.class)))
    })
    @GetMapping
    public ResponseEntity<ApiResponse<AuthUserResp>> getMe(
            @Parameter(hidden = true) @AuthenticationPrincipal PrioncipalUser principalUser
    ) {
        Long userId = principalUser.getUser().getId();
        return ResponseEntity.ok(ApiResponse.success(userService.getMe(userId)));
    }

    @Operation(summary = "내 정보 수정", description = "JWT 인증 사용자의 이름, 이메일, 자기소개를 수정합니다.")
    @ApiResponses({
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "성공 - 수정된 사용자 정보를 ApiResponse<AuthUserResp> 형식으로 반환합니다.", content = @Content(schema = @Schema(implementation = ApiResponse.class))),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "실패 또는 Validation 오류 - 중복 이메일 또는 요청 값 검증 실패입니다.", content = @Content(schema = @Schema(implementation = ApiResponse.class))),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "인증 오류 - JWT 토큰이 없거나 유효하지 않습니다.", content = @Content(schema = @Schema(implementation = ApiResponse.class)))
    })
    @PutMapping
    public ResponseEntity<ApiResponse<AuthUserResp>> updateMe(
            @Parameter(hidden = true) @AuthenticationPrincipal PrioncipalUser principalUser,
            @Valid @RequestBody ProfileUpdateReqDto reqDto
    ) {
        Long userId = principalUser.getUser().getId();
        return ResponseEntity.ok(ApiResponse.success(userService.updateProfile(userId, reqDto)));
    }
}
