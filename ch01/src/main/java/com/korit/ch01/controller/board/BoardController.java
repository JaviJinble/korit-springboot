package com.korit.ch01.controller.board;

import com.korit.ch01.controller.board.dto.BoardReqCreate;
import com.korit.ch01.controller.board.dto.BoardReqList;
import com.korit.ch01.controller.board.dto.BoardResp;
import com.korit.ch01.controller.board.dto.BoardUpdate;
import com.korit.ch01.controller.user.dto.UserResp;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/boards")
@CrossOrigin
@Tag(name = "board", description = "게시판 게시글 등록/조회/수정/삭제 기능 정의")
public class BoardController {
    @PostMapping
    @Operation(
            summary = "게시글 등록",
            description = """
                게시글 제목과 내용을 입력받아 새 게시글을 등록합니다.<br>
                <br>
                - title: 게시글 제목<br>
                - content: 게시글 내용<br>
                - userId: 작성자 회원 번호<br>
                <br>
                등록 성공 시 생성된 게시글 정보를 반환합니다.
                """
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "201",
                    description = "게시글 등록 성공",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = BoardResp.class),
                            examples = {
                                    @ExampleObject(
                                            name = "게시글 등록 성공 예시",
                                            summary = "게시글 생성 성공 응답",
                                            value = """
                                                {
                                                  "userId": 1,
                                                  "boardId": 10,
                                                  "name": "김명준",
                                                  "title": "스프링부트 게시판 만들기",
                                                  "content": "오늘은 Swagger를 공부했습니다.",
                                                  "createdAt": "2026-05-28T11:30:00"
                                                }
                                                """
                                    )
                            }
                    )
            ),

            @ApiResponse(
                    responseCode = "400",
                    description = "잘못된 요청 데이터",
                    content = @Content(
                            mediaType = "application/json",
                            examples = {
                                    @ExampleObject(
                                            name = "잘못된 요청",
                                            summary = "title 값 누락",
                                            value = """
                                                {
                                                  "message": "title은 필수 입력값입니다."
                                                }
                                                """
                                    )
                            }
                    )
            ),

            @ApiResponse(
                    responseCode = "500",
                    description = "서버 내부 오류"
            )
    })
    public ResponseEntity<BoardResp> create(@RequestBody BoardReqCreate dto) {
        return ResponseEntity.ok(null);
    }

    @PostMapping(value = "/{boardId}/files", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(
            summary = "게시글 파일 업로드",
            description = "게시글에 이미지 또는 동영상 파일을 업로드합니다."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "파일 업로드 성공"),
            @ApiResponse(responseCode = "400", description = "잘못된 파일 요청"),
            @ApiResponse(responseCode = "404", description = "게시글을 찾을 수 없음"),
            @ApiResponse(responseCode = "415", description = "지원하지 않는 파일 형식")
    })
    public ResponseEntity<?> createImages(@PathVariable int boardId, @RequestParam MultipartFile file) {
        String contentType = file.getContentType();

        if(contentType.startsWith("image")){
            System.out.println("이미지 파일");
        }

        if(contentType.startsWith("video")) {
            System.out.println("동영상 파일");
        }

        return ResponseEntity.ok(null);
    }


    @GetMapping("/dto")
    @Operation(summary = "게시글 목록 조회", description = "query, userId, page, size 조건으로 게시글 목록을 조회합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "게시글 목록 조회 성공"),
            @ApiResponse(responseCode = "400", description = "잘못된 조회 조건")
    })
    public ResponseEntity<List<BoardResp>> listByDto(BoardReqList dto) {
        System.out.println(dto.getQuery());
        System.out.println(dto.getUserId());
        System.out.println(dto.getPage());
        System.out.println(dto.getSize());
        return ResponseEntity.ok(List.of());
    }

    @PutMapping("/{boardId}")
    @Operation(summary = "게시글 전체 수정", description = "boardId에 해당하는 게시글의 제목과 내용을 전체 수정합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "게시글 수정 성공"),
            @ApiResponse(responseCode = "400", description = "잘못된 요청 데이터"),
            @ApiResponse(responseCode = "404", description = "게시글을 찾을 수 없음")
    })
    public ResponseEntity<BoardResp> update(@RequestBody BoardUpdate dto) {
        System.out.println(dto);
        return ResponseEntity.ok(null);
    }

    @PatchMapping("/{boardId}")
    @Operation(summary = "게시글 일부 수정", description = "boardId에 해당하는 게시글의 제목 또는 내용을 일부 수정합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "게시글 일부 수정 성공"),
            @ApiResponse(responseCode = "400", description = "잘못된 요청 데이터"),
            @ApiResponse(responseCode = "404", description = "게시글을 찾을 수 없음")
    })
    public ResponseEntity<BoardResp> modify(@RequestBody BoardUpdate dto) {
        System.out.println(dto);
        return ResponseEntity.ok(null);
    }
}
