package com.korit.ch04api.common.exception.exceptionController;

import com.korit.ch04api.common.exception.DuplicatedException;
import com.korit.ch04api.dto.ApiResponse;
import com.korit.ch04api.dto.ErrorResponse;
import com.korit.ch04api.dto.NotValidResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(DuplicatedException.class)
    public ResponseEntity<ApiResponse<DuplicatedException>> duplicated(DuplicatedException e) {
        return ResponseEntity.badRequest().body(ApiResponse.fail("중복 데이터 오류", e));
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<ApiResponse<AuthenticationException>> authentication(AuthenticationException e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ApiResponse.fail("인증 오류", e));
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ApiResponse<ErrorResponse>> accessDenied(AccessDeniedException e) {
        ErrorResponse errorResponse = new ErrorResponse("403", "Forbidden", "요청 권한이 없습니다", null);
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(ApiResponse.fail("권한 오류", errorResponse));
    }

    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<ApiResponse<ErrorResponse>> responseStatus(ResponseStatusException e) {
        HttpStatus status = HttpStatus.valueOf(e.getStatusCode().value());
        ErrorResponse errorResponse = new ErrorResponse(
                String.valueOf(status.value()),
                status.getReasonPhrase(),
                e.getReason(),
                null
        );
        return ResponseEntity.status(status).body(ApiResponse.fail("요청 실패.", errorResponse));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<NotValidResponse>> notValid(MethodArgumentNotValidException e) {
        List<NotValidResponse.ErrorField> errorFields = e.getBindingResult().getFieldErrors().stream()
                .map(fieldError -> new NotValidResponse.ErrorField(
                            fieldError.getField(),
                            fieldError.getRejectedValue(),
                            fieldError.getDefaultMessage())
                ).toList();
        return ResponseEntity.badRequest().body(ApiResponse.fail("Validation 오류", new NotValidResponse("유효성 검사 오류", errorFields)));
    }

}
