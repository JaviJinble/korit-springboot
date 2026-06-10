package com.korit.todoapi.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class ApiResponse<T> {

    private boolean success;
    private String message;
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