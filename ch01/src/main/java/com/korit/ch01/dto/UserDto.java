package com.korit.ch01.dto;

public record UserDto(
        String username,
        String password,
        String name,
        String email
) {}