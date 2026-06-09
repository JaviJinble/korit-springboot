package com.korit.ch05api.common.exceptionController;

import com.korit.ch05api.common.exception.DuplicatedException;
import com.korit.ch05api.dto.ApiResponse;
import com.korit.ch05api.dto.NotValidResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(DuplicatedException.class)
    public ResponseEntity<ApiResponse<DuplicatedException>> duplicated(DuplicatedException e) {
        return ResponseEntity.badRequest().body(ApiResponse.fail(e));
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<ApiResponse<AuthenticationException>> authentocation(AuthenticationException e) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(ApiResponse.fail(e));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse> notValid(MethodArgumentNotValidException e) {
        List<NotValidResponse.ErrorField> errorFields = e.getBindingResult().getFieldErrors().stream()
                .map(fieldError -> new NotValidResponse.ErrorField(
                            fieldError.getField(),
                            fieldError.getRejectedValue(),
                            fieldError.getDefaultMessage())
                ).toList();
        return ResponseEntity.badRequest().body(ApiResponse.fail(new NotValidResponse("유효성 검사 오류", errorFields)));
    }

}
