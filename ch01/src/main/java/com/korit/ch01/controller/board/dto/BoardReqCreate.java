package com.korit.ch01.controller.board.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(
        name = "BoardReqCreate",
        description = "게시글 등록 요청 DTO"
)
public record BoardReqCreate(
        @Schema(
                example = "1",
                description = "게시글 작성자 회원 번호"
        )
        int userId,
        @Schema(
                example = "게시판 만들기",
                description = "게시글 제목"
        )
        String title,
        @Schema(
                example = "게시글 작성 내용",
                description = "게시글 내용"
        )
        String content
) {}
