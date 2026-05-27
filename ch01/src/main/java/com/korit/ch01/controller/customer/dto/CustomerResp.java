package com.korit.ch01.controller.customer.dto;

import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDateTime;

@Schema(
        name = "CustomerResp",
        description = "고객 정보 관련 API에서 공통적으로 사용하는 응답 모델입니다."
)
public record CustomerResp (
        @Schema(
                example = "1",
                description = "-고객 고유 식별 번호(PK)"
        )
        int userId,
        @Schema(
                example = "test1234",
                description = "-고객이름"
        )
        String name,
        @Schema(
                example = "test@gmail.com",
                description = "-고객 이메일"
        )
        String email,
        @Schema(
                example = "+821012345678",
                description = "-고객 연락처(E.164 국제 표준)"
        )
        String phoneE164,
        @Schema(
                description = "- 정보 등록 일시"
        )
        LocalDateTime createdAt,
        @Schema(
                description = "- 정보 수정 일시"
        )
        LocalDateTime updatedAt

) {}
