package com.korit.ch04api.service;

import com.korit.ch04api.dto.AttachmentDownloadDto;
import com.korit.ch04api.dto.AttachmentRespDto;
import com.korit.ch04api.entity.Attachment;
import com.korit.ch04api.mapper.AttachmentMapper;
import com.korit.ch04api.mapper.NoteMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AttachmentService {

    private final AttachmentMapper attachmentMapper;
    private final NoteMapper noteMapper;
    private final Path uploadRoot = Paths.get("uploads", "attachments").toAbsolutePath().normalize();

    @Transactional(rollbackFor = Exception.class)
    public AttachmentRespDto uploadNoteAttachment(Long userId, Long noteId, MultipartFile file) {
        validateNoteOwner(userId, noteId);

        if (file == null || file.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "업로드할 파일을 선택해주세요.");
        }

        try {
            Files.createDirectories(uploadRoot);

            String originalFileName = StringUtils.cleanPath(file.getOriginalFilename() == null ? "file" : file.getOriginalFilename());
            String extension = "";
            int extensionIndex = originalFileName.lastIndexOf(".");
            if (extensionIndex >= 0) {
                extension = originalFileName.substring(extensionIndex);
            }

            String storedFileName = UUID.randomUUID() + extension;
            Path targetPath = uploadRoot.resolve(storedFileName).normalize();
            file.transferTo(targetPath);

            Attachment attachment = Attachment.builder()
                    .noteId(noteId)
                    .userId(userId)
                    .originalFileName(originalFileName)
                    .storedFileName(storedFileName)
                    .contentType(file.getContentType())
                    .fileSize(file.getSize())
                    .filePath(targetPath.toString())
                    .build();

            attachmentMapper.insertAttachment(attachment);
            return toRespDto(attachment);
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "파일 저장 중 오류가 발생했습니다.", e);
        }
    }

    public List<AttachmentRespDto> getNoteAttachments(Long userId, Long noteId) {
        validateNoteOwner(userId, noteId);
        return attachmentMapper.selectAttachmentsByNoteId(noteId, userId).stream()
                .map(this::toRespDto)
                .toList();
    }

    public AttachmentDownloadDto getDownloadFile(Long userId, Long attachmentId) {
        Attachment attachment = findAttachment(userId, attachmentId);

        try {
            Path filePath = Paths.get(attachment.getFilePath()).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if (!resource.exists() || !resource.isReadable()) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "파일을 찾을 수 없습니다.");
            }

            return AttachmentDownloadDto.builder()
                    .originalFileName(attachment.getOriginalFileName())
                    .contentType(attachment.getContentType())
                    .resource(resource)
                    .build();
        } catch (MalformedURLException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "파일 경로를 읽을 수 없습니다.", e);
        }
    }

    @Transactional(rollbackFor = Exception.class)
    public void deleteAttachment(Long userId, Long attachmentId) {
        Attachment attachment = findAttachment(userId, attachmentId);
        int deletedCount = attachmentMapper.deleteAttachment(attachmentId, userId);

        if (deletedCount == 0) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "첨부파일을 찾을 수 없습니다.");
        }

        try {
            Files.deleteIfExists(Paths.get(attachment.getFilePath()).normalize());
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "파일 삭제 중 오류가 발생했습니다.", e);
        }
    }

    private void validateNoteOwner(Long userId, Long noteId) {
        if (noteMapper.existsNoteByIdAndUserId(noteId, userId) == 0) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "메모를 찾을 수 없습니다.");
        }
    }

    private Attachment findAttachment(Long userId, Long attachmentId) {
        Attachment attachment = attachmentMapper.selectAttachmentByIdAndUserId(attachmentId, userId);
        if (attachment == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "첨부파일을 찾을 수 없습니다.");
        }
        return attachment;
    }

    private AttachmentRespDto toRespDto(Attachment attachment) {
        return AttachmentRespDto.builder()
                .id(attachment.getId())
                .noteId(attachment.getNoteId())
                .originalFileName(attachment.getOriginalFileName())
                .contentType(attachment.getContentType())
                .fileSize(attachment.getFileSize())
                .createdAt(attachment.getCreatedAt())
                .build();
    }
}
