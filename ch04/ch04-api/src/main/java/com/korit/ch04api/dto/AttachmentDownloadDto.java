package com.korit.ch04api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.core.io.Resource;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AttachmentDownloadDto {
    private String originalFileName;
    private String contentType;
    private Resource resource;
}
