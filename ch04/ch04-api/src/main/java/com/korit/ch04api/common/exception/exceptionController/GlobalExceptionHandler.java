package com.korit.ch04api.common.exception;

import com.korit.ch04api.dto.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(DuplicatedException.class)
    public ResponseEntity<ApiResponse> duplicated(DuplicatedException e) {
        String message = "중복된 값입니다.";
        return ResponseEntity.badRequest().body(ApiResponse.fail(message, e));
    }

}
