package com.korit.ch04api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
public class NotValidResponse {
    private String message;
    private List<ErrorField> errorFields;

    @Data
    @AllArgsConstructor
    public static class ErrorField {
        private String fieldName;
        private Object fieldValue;
        private String defaultMessage;
    }
}
