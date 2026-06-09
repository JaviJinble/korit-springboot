package com.korit.ch04api.mapper;

import com.korit.ch04api.entity.Attachment;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface AttachmentMapper {
    int insertAttachment(Attachment attachment);
    List<Attachment> selectAttachmentsByNoteId(@Param("noteId") Long noteId, @Param("userId") Long userId);
    Attachment selectAttachmentByIdAndUserId(@Param("attachmentId") Long attachmentId, @Param("userId") Long userId);
    int deleteAttachment(@Param("attachmentId") Long attachmentId, @Param("userId") Long userId);
    int deleteAttachmentsByNoteId(@Param("noteId") Long noteId, @Param("userId") Long userId);
}
