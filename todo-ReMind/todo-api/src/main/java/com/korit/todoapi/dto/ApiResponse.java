package com.korit.todoapi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ApiResponse<T> {
    private boolean success;
    private String message;
    private T body;

    public static <T> ApiResponse<T> success() {
        return new ApiResponse<T> (true, "요청 성공.", null);
    }

    public static <T> ApiResponse<T> success(String message) {
        return new ApiResponse<T> (true, message, null);
    }

    public static <T> ApiResponse<T> success(T body) {
        return new ApiResponse<T> (true, "요청 성공.", body);
    }

    public static <T> ApiResponse<T> success(String message, T body) {
        return new ApiResponse<T> (true, message, body);
    }

    public static <T> ApiResponse<T> fail() {
        return new ApiResponse<T> (false, "요청 실패.", null);
    }

    public static <T> ApiResponse<T> fail(String message) {
        return new ApiResponse<T> (false, message, null);
    }

    public static <T> ApiResponse<T> fail(T body) {
        return new ApiResponse<T> (false, "요청 실패.", body);
    }

    public static <T> ApiResponse<T> fail(String message, T body) {
        return new ApiResponse<T> (false, message, body);
    }
}
