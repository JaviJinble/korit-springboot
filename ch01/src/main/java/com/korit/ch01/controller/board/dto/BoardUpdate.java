package com.korit.ch01.controller.board.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(
        name = "BoardUpdate",
        description = "게시글 수정 요청 DTO"
)
public class BoardUpdate {

    @Schema(
            example = "수정된 게시글 제목",
            description = "수정할 게시글 제목"
    )
    private String title;

    @Schema(
            example = "수정된 게시글 내용입니다.",
            description = "수정할 게시글 내용"
    )
    private String content;
}
