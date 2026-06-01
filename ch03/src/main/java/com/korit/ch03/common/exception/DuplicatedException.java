package com.korit.ch03.common.exception;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;

@Getter
@JsonIgnoreProperties({"cause", "localizedMessage", "stackTrace", "suppressed"})
public class DuplicatedException extends RuntimeException{
    private String fieldName;
    private Object value;

    public DuplicatedException(String message, String fieldName, Object value) {
        super(message);
        this.fieldName = fieldName;
        this.value = value;
    }
}
