package com.korit.todoapi.common.exception;

public class TodoNotFoundException extends RuntimeException {
    public TodoNotFoundException(String message) {
        super("지정하신 카테고리는 존재하지 않습니다");
    }
}
