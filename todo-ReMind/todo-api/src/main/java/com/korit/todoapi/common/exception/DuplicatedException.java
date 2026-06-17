package com.korit.todoapi.common.exception;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;

@Getter
@JsonIgnoreProperties({ "cause", "localizedMessage", "stackTrace", "suppressed" })
public class DuplicatedException extends RuntimeException {
    private String fieldName;
    private String fieldValue;

    public DuplicatedException(String message, String fieldName, String fieldValue) {
        super(message);
        this.fieldName = fieldName;
        this.fieldValue = fieldValue;
    }
}
