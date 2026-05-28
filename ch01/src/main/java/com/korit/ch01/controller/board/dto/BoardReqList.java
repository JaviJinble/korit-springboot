package com.korit.ch01.controller.board.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(
        name = "BoardReqList",
        description = "게시글 목록 조회 요청 DTO"
)
public class BoardReqList {

    @Schema(
            example = "test",
            description = "게시글 통합 검색어"
    )
    private String query;

    @Schema(
            example = "1",
            description = "작성자 회원 번호"
    )
    private int userId;

    @Schema(
            example = "1",
            description = "조회할 페이지 번호"
    )
    private int page;

    @Schema(
            example = "10",
            description = "한 페이지당 조회 개수"
    )
    private int size;

}