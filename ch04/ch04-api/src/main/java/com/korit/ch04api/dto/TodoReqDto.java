package com.korit.ch04api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

import java.time.LocalDate;

@Data
public class TodoReqDto {
    @NotBlank(message = "할 일을 입력해주세요.")
    private String content;

    private LocalDate deadline;

    @NotBlank(message = "priority를 선택해주세요.")
    @Pattern(regexp = "HIGH|MEDIUM|LOW", message = "priority는 HIGH, MEDIUM, LOW 중 하나여야 합니다.")
    private String priority = "MEDIUM";
}
