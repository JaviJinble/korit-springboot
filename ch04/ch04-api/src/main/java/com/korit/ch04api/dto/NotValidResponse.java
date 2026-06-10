package com.korit.ch04api.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Schema(description = "Validation 오류 응답 본문")
@Data
@AllArgsConstructor
public class NotValidResponse {
    @Schema(description = "Validation 오류 메시지", example = "유효성 검사 오류")
    private String message;

    @Schema(description = "필드별 오류 목록")
    private List<ErrorField> errorFields;

    @Schema(description = "Validation 필드 오류")
    @Data
    @AllArgsConstructor
    public static class ErrorField {
        @Schema(description = "오류 필드명", example = "username")
        private String fieldName;

        @Schema(description = "거절된 입력값", example = "qa")
        private Object fieldValue;

        @Schema(description = "기본 오류 메시지", example = "아이디는 4~12자의 영문 소문자, 숫자, 특수문자(-, _)만 사용 가능합니다.")
        private String defaultMessage;
    }
}
