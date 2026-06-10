package com.korit.ch04api.controller;

import com.korit.ch04api.dto.ApiResponse;
import com.korit.ch04api.dto.NoteReqDto;
import com.korit.ch04api.dto.NoteRespDto;
import com.korit.ch04api.security.PrioncipalUser;
import com.korit.ch04api.service.NoteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("/api/notes")
@RestController
@RequiredArgsConstructor
@Tag(name = "Note", description = "개인 메모 CRUD API")
public class NoteController {

    private final NoteService noteService;

    @Operation(summary = "메모 목록 조회", description = "로그인한 사용자의 메모 목록과 첨부파일 목록을 조회합니다.")
    @ApiResponses({
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "성공 - ApiResponse<List<NoteRespDto>> 형식으로 반환합니다.", content = @Content(schema = @Schema(implementation = ApiResponse.class))),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "인증 오류 - JWT 토큰이 없거나 유효하지 않습니다.", content = @Content(schema = @Schema(implementation = ApiResponse.class)))
    })
    @GetMapping
    public ResponseEntity<ApiResponse<List<NoteRespDto>>> getNotes(
            @Parameter(hidden = true) @AuthenticationPrincipal PrioncipalUser principalUser
    ) {
        Long userId = principalUser.getUser().getId();
        return ResponseEntity.ok(ApiResponse.success(noteService.getNotes(userId)));
    }

    @Operation(summary = "메모 추가", description = "로그인한 사용자의 메모를 생성합니다.")
    @ApiResponses({
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "성공 - 생성된 메모를 ApiResponse<NoteRespDto> 형식으로 반환합니다.", content = @Content(schema = @Schema(implementation = ApiResponse.class))),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Validation 오류 - 제목 또는 내용 검증 실패입니다.", content = @Content(schema = @Schema(implementation = ApiResponse.class))),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "인증 오류 - JWT 토큰이 없거나 유효하지 않습니다.", content = @Content(schema = @Schema(implementation = ApiResponse.class)))
    })
    @PostMapping
    public ResponseEntity<ApiResponse<NoteRespDto>> addNote(
            @Parameter(hidden = true) @AuthenticationPrincipal PrioncipalUser principalUser,
            @Valid @RequestBody NoteReqDto reqDto
    ) {
        Long userId = principalUser.getUser().getId();
        return ResponseEntity.ok(ApiResponse.success(noteService.addNote(userId, reqDto)));
    }

    @Operation(summary = "메모 수정", description = "메모 제목과 내용을 수정합니다.")
    @ApiResponses({
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "성공 - ApiResponse<Void> 형식으로 반환합니다.", content = @Content(schema = @Schema(implementation = ApiResponse.class))),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Validation 오류 - 요청 값 검증 실패입니다.", content = @Content(schema = @Schema(implementation = ApiResponse.class))),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "인증 오류 - JWT 토큰이 없거나 유효하지 않습니다.", content = @Content(schema = @Schema(implementation = ApiResponse.class))),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "실패 - 메모를 찾을 수 없거나 소유자가 아닙니다.", content = @Content(schema = @Schema(implementation = ApiResponse.class)))
    })
    @PutMapping("/{noteId}")
    public ResponseEntity<ApiResponse<Void>> updateNote(
            @Parameter(hidden = true) @AuthenticationPrincipal PrioncipalUser principalUser,
            @Parameter(description = "수정할 메모 ID", example = "1") @PathVariable Long noteId,
            @Valid @RequestBody NoteReqDto reqDto
    ) {
        Long userId = principalUser.getUser().getId();
        noteService.updateNote(userId, noteId, reqDto);
        return ResponseEntity.ok(ApiResponse.success());
    }

    @Operation(summary = "메모 삭제", description = "메모와 연결된 첨부파일 정보를 삭제합니다.")
    @ApiResponses({
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "성공 - ApiResponse<Void> 형식으로 반환합니다.", content = @Content(schema = @Schema(implementation = ApiResponse.class))),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "인증 오류 - JWT 토큰이 없거나 유효하지 않습니다.", content = @Content(schema = @Schema(implementation = ApiResponse.class))),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "실패 - 메모를 찾을 수 없거나 소유자가 아닙니다.", content = @Content(schema = @Schema(implementation = ApiResponse.class)))
    })
    @DeleteMapping("/{noteId}")
    public ResponseEntity<ApiResponse<Void>> deleteNote(
            @Parameter(hidden = true) @AuthenticationPrincipal PrioncipalUser principalUser,
            @Parameter(description = "삭제할 메모 ID", example = "1") @PathVariable Long noteId
    ) {
        Long userId = principalUser.getUser().getId();
        noteService.deleteNote(userId, noteId);
        return ResponseEntity.ok(ApiResponse.success());
    }
}
