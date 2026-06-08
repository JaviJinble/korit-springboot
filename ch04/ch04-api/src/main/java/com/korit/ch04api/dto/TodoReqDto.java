package com.korit.ch04api.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class TodoReqDto {
    @NotBlank(message = "할 일을 입력해주세요.")
    private String content;
}
