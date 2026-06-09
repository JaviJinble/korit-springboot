package com.korit.ch04api.controller;

import com.korit.ch04api.dto.ApiResponse;
import com.korit.ch04api.dto.AttachmentDownloadDto;
import com.korit.ch04api.dto.AttachmentRespDto;
import com.korit.ch04api.security.PrioncipalUser;
import com.korit.ch04api.service.AttachmentService;
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
public class AttachmentController {

    private final AttachmentService attachmentService;

    @GetMapping("/notes/{noteId}/attachments")
    public ResponseEntity<ApiResponse<List<AttachmentRespDto>>> getNoteAttachments(
            @AuthenticationPrincipal PrioncipalUser principalUser,
            @PathVariable Long noteId
    ) {
        Long userId = principalUser.getUser().getId();
        return ResponseEntity.ok(ApiResponse.success(attachmentService.getNoteAttachments(userId, noteId)));
    }

    @PostMapping(value = "/notes/{noteId}/attachments", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<AttachmentRespDto>> uploadNoteAttachment(
            @AuthenticationPrincipal PrioncipalUser principalUser,
            @PathVariable Long noteId,
            @RequestParam("file") MultipartFile file
    ) {
        Long userId = principalUser.getUser().getId();
        return ResponseEntity.ok(ApiResponse.success(attachmentService.uploadNoteAttachment(userId, noteId, file)));
    }

    @GetMapping("/attachments/{attachmentId}/download")
    public ResponseEntity<Resource> downloadAttachment(
            @AuthenticationPrincipal PrioncipalUser principalUser,
            @PathVariable Long attachmentId
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

    @DeleteMapping("/attachments/{attachmentId}")
    public ResponseEntity<ApiResponse<Void>> deleteAttachment(
            @AuthenticationPrincipal PrioncipalUser principalUser,
            @PathVariable Long attachmentId
    ) {
        Long userId = principalUser.getUser().getId();
        attachmentService.deleteAttachment(userId, attachmentId);
        return ResponseEntity.ok(ApiResponse.success());
    }
}
