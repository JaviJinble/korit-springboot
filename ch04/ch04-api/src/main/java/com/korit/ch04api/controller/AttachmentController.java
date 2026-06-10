package com.korit.ch04api.controller;

import com.korit.ch04api.dto.ApiResponse;
import com.korit.ch04api.dto.AttachmentDownloadDto;
import com.korit.ch04api.dto.AttachmentRespDto;
import com.korit.ch04api.security.PrioncipalUser;
import com.korit.ch04api.service.AttachmentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;

@RequestMapping("/api")
@RestController
@RequiredArgsConstructor
@Tag(name = "Attachment", description = "메모 첨부파일 API")
public class AttachmentController {

    private final AttachmentService attachmentService;

    @Operation(summary = "메모 첨부파일 목록 조회", description = "특정 메모의 첨부파일 목록을 조회합니다.")
    @ApiResponses({
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "성공 - ApiResponse<List<AttachmentRespDto>> 형식으로 반환합니다.", content = @Content(schema = @Schema(implementation = ApiResponse.class))),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "인증 오류 - JWT 토큰이 없거나 유효하지 않습니다.", content = @Content(schema = @Schema(implementation = ApiResponse.class))),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "실패 - 메모를 찾을 수 없거나 소유자가 아닙니다.", content = @Content(schema = @Schema(implementation = ApiResponse.class)))
    })
    @GetMapping("/notes/{noteId}/attachments")
    public ResponseEntity<ApiResponse<List<AttachmentRespDto>>> getNoteAttachments(
            @Parameter(hidden = true) @AuthenticationPrincipal PrioncipalUser principalUser,
            @Parameter(description = "첨부파일을 조회할 메모 ID", example = "1") @PathVariable Long noteId
    ) {
        Long userId = principalUser.getUser().getId();
        return ResponseEntity.ok(ApiResponse.success(attachmentService.getNoteAttachments(userId, noteId)));
    }

    @Operation(summary = "메모 첨부파일 업로드", description = "특정 메모에 첨부파일을 업로드합니다.")
    @ApiResponses({
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "성공 - 업로드된 첨부파일 정보를 ApiResponse<AttachmentRespDto> 형식으로 반환합니다.", content = @Content(schema = @Schema(implementation = ApiResponse.class))),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "실패 - 업로드할 파일이 없거나 요청이 올바르지 않습니다.", content = @Content(schema = @Schema(implementation = ApiResponse.class))),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "인증 오류 - JWT 토큰이 없거나 유효하지 않습니다.", content = @Content(schema = @Schema(implementation = ApiResponse.class))),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "실패 - 메모를 찾을 수 없거나 소유자가 아닙니다.", content = @Content(schema = @Schema(implementation = ApiResponse.class)))
    })
    @PostMapping(value = "/notes/{noteId}/attachments", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<AttachmentRespDto>> uploadNoteAttachment(
            @Parameter(hidden = true) @AuthenticationPrincipal PrioncipalUser principalUser,
            @Parameter(description = "첨부파일을 업로드할 메모 ID", example = "1") @PathVariable Long noteId,
            @Parameter(description = "업로드할 파일") @RequestParam("file") MultipartFile file
    ) {
        Long userId = principalUser.getUser().getId();
        return ResponseEntity.ok(ApiResponse.success(attachmentService.uploadNoteAttachment(userId, noteId, file)));
    }

    @Operation(summary = "첨부파일 다운로드", description = "첨부파일을 다운로드합니다. 성공 시 파일 바이너리를 반환하고, 실패/인증 오류는 ApiResponse 형식으로 반환합니다.")
    @ApiResponses({
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "성공 - 파일 스트림을 반환합니다.", content = @Content(mediaType = MediaType.APPLICATION_OCTET_STREAM_VALUE)),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "인증 오류 - JWT 토큰이 없거나 유효하지 않습니다.", content = @Content(schema = @Schema(implementation = ApiResponse.class))),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "실패 - 첨부파일을 찾을 수 없거나 소유자가 아닙니다.", content = @Content(schema = @Schema(implementation = ApiResponse.class))),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "500", description = "실패 - 파일 경로를 읽을 수 없습니다.", content = @Content(schema = @Schema(implementation = ApiResponse.class)))
    })
    @GetMapping("/attachments/{attachmentId}/download")
    public ResponseEntity<Resource> downloadAttachment(
            @Parameter(hidden = true) @AuthenticationPrincipal PrioncipalUser principalUser,
            @Parameter(description = "다운로드할 첨부파일 ID", example = "1") @PathVariable Long attachmentId
    ) {
        Long userId = principalUser.getUser().getId();
        AttachmentDownloadDto downloadDto = attachmentService.getDownloadFile(userId, attachmentId);
        String encodedFileName = URLEncoder.encode(downloadDto.getOriginalFileName(), StandardCharsets.UTF_8).replace("+", "%20");
        String contentType = downloadDto.getContentType() == null ? MediaType.APPLICATION_OCTET_STREAM_VALUE : downloadDto.getContentType();

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename*=UTF-8''" + encodedFileName)
                .body(downloadDto.getResource());
    }

    @Operation(summary = "첨부파일 삭제", description = "첨부파일 메타데이터와 실제 파일을 삭제합니다.")
    @ApiResponses({
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "성공 - ApiResponse<Void> 형식으로 반환합니다.", content = @Content(schema = @Schema(implementation = ApiResponse.class))),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "인증 오류 - JWT 토큰이 없거나 유효하지 않습니다.", content = @Content(schema = @Schema(implementation = ApiResponse.class))),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "실패 - 첨부파일을 찾을 수 없거나 소유자가 아닙니다.", content = @Content(schema = @Schema(implementation = ApiResponse.class))),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "500", description = "실패 - 실제 파일 삭제 중 오류가 발생했습니다.", content = @Content(schema = @Schema(implementation = ApiResponse.class)))
    })
    @DeleteMapping("/attachments/{attachmentId}")
    public ResponseEntity<ApiResponse<Void>> deleteAttachment(
            @Parameter(hidden = true) @AuthenticationPrincipal PrioncipalUser principalUser,
            @Parameter(description = "삭제할 첨부파일 ID", example = "1") @PathVariable Long attachmentId
    ) {
        Long userId = principalUser.getUser().getId();
        attachmentService.deleteAttachment(userId, attachmentId);
        return ResponseEntity.ok(ApiResponse.success());
    }
}
