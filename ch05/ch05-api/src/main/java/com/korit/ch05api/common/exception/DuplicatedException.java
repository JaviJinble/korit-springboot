package com.korit.ch05api.common.exception;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;

@Getter
@JsonIgnoreProperties({"cause", "localizedMessage", "stackTrace", "suppressed"})
public class DuplicatedException extends RuntimeException{
    private final String fieldName;
    private final Object fieldValue;

    public DuplicatedException(String message, String fieldName, Object fieldValue) {
        super(message);
        this.fieldName = fieldName;
        this.fieldValue = fieldValue;
    }
}
