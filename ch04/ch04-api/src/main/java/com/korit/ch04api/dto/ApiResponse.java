package com.korit.ch04api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "공통 API 응답")
@Data
@Builder
@AllArgsConstructor
public class ApiResponse<T> {

    @Schema(description = "요청 성공 여부", example = "true")
    private boolean success;

    @Schema(description = "응답 메시지", example = "요청 성공.")
    private String message;

    @Schema(description = "응답 본문")
    private T body;

    public static <T> ApiResponse<T> success() {
        return new ApiResponse<>(true, "요청 성공.", null);
    }

    public static <T> ApiResponse<T> success(String message) {
        return new ApiResponse<>(true, message, null);
    }

    public static <T> ApiResponse<T> success(T body) {
        return new ApiResponse<>(true, "요청 성공.", body);
    }

    public static <T> ApiResponse<T> success(String message, T body) {
        return new ApiResponse<>(true, message, body);
    }

    public static <T> ApiResponse<T> fail() {
        return new ApiResponse<>(false, "요청 실패.", null);
    }

    public static <T> ApiResponse<T> fail(String message) {
        return new ApiResponse<>(false, message, null);
    }

    public static <T> ApiResponse<T> fail(T body) {
        return new ApiResponse<>(false, "요청 실패.", body);
    }

    public static <T> ApiResponse<T> fail(String message, T body) {
        return new ApiResponse<>(false, message, body);
    }
}
