package com.korit.ch04api.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;

@Schema(description = "공통 오류 상세 응답")
@Data
@AllArgsConstructor
public class ErrorResponse {
    @Schema(description = "HTTP 상태 코드", example = "401")
    private String status;

    @Schema(description = "오류 유형", example = "Unauthorized")
    private String error;

    @Schema(description = "오류 메시지", example = "토큰 인가 실패")
    private String message;

    @Schema(description = "요청 경로", example = "/api/todos")
    private String path;
}
