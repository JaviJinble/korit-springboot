package com.korit.ch05api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

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
