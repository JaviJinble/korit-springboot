package com.korit.ch01.controller.board.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Schema(
        name = "BoardResp",
        description = "게시글 응답 DTO"
)
public class BoardResp {

    @Schema(
            example = "1",
            description = "게시글 작성자 회원 번호"
    )
    private int userId;

    @Schema(
            example = "10",
            description = "게시글 번호"
    )
    private int boardId;

    @Schema(
            example = "test",
            description = "게시글 작성자 이름"
    )
    private String name;

    @Schema(
            example = "게시판 만들기",
            description = "게시글 제목"
    )
    private String title;

    @Schema(
            example = "게시글 test작성 했습니다.",
            description = "게시글 내용"
    )
    private String content;

    @Schema(
            description = "게시글 작성일"
    )
    private LocalDateTime createdAt;

}