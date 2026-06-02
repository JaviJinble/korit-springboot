package com.korit.ch03.common.exception;

import com.korit.ch03.common.dto.ApiResponse;
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

    @ExceptionHandler(CategoryNotFoundException.class)
    public ResponseEntity<ApiResponse> categoryNotFound(
            CategoryNotFoundException e) {

        return ResponseEntity
                .badRequest()
                .body(ApiResponse.fail(e.getMessage(), e));
    }
}
