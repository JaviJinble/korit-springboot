package com.korit.ch03.common.exception;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;

public class CategoryNotFoundException extends RuntimeException {

@JsonIgnoreProperties({"cause", "localizedMessage", "stackTrace", "suppressed"})
public CategoryNotFoundException() {
        super("존재하지 않는 카테고리입니다.");
    }

    public CategoryNotFoundException(String message) {
        super(message);
    }
}