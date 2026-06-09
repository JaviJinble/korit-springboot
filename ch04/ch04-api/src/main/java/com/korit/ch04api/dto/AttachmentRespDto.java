package com.korit.ch04api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AttachmentRespDto {
    private Long id;
    private Long noteId;
    private String originalFileName;
    private String contentType;
    private Long fileSize;
    private LocalDateTime createdAt;
}
