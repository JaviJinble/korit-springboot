package com.korit.ch02.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public record BookCreateRequest(

        @NotBlank(message = "제목은 필수 입력값입니다.")
        String title,

        @NotBlank(message = "저자는 필수 입력값입니다.")
        String author,

        @Min(value = 0, message = "가격은 0원 이상이어야 합니다.")
        int price

) {
}