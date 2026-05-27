package com.korit.ch01.controller.user.dto;

import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDateTime;

@Schema(
        name = "UserResp",
        description = "사용자 정보 관련 API에서 공통적으로 사용하는 응답 모델입니다."
)
public record UserResp(
        @Schema(
                example = "1",
                description = "-사용자 고유 번호(PK)"
        )
        int userId,
        @Schema(
                example = "test1234",
                description = "-사용자이름"
        )
        String username,
        @Schema(
                example = "test@gmail.com",
                description = "-사용자 이메일"
        )
        String email,
        @Schema(
                description = "- 정보 등록 일시"
        )
        LocalDateTime createdAt,
        @Schema(
                description = "- 정보 수정 일시"
        )
        LocalDateTime updatedAt
) {}
