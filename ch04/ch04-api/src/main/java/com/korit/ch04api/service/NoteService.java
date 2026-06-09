package com.korit.ch04api.service;

import com.korit.ch04api.dto.NoteReqDto;
import com.korit.ch04api.dto.NoteRespDto;
import com.korit.ch04api.entity.Note;
import com.korit.ch04api.mapper.NoteMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NoteService {

    private final NoteMapper noteMapper;

    public List<NoteRespDto> getNotes(Long userId) {
        List<Note> notes = noteMapper.selectNotesByUserId(userId);
        return notes.stream().map(this::toRespDto).collect(Collectors.toList());
    }

    @Transactional(rollbackFor = Exception.class)
    public NoteRespDto addNote(Long userId, NoteReqDto reqDto) {
        Note note = Note.builder()
                .userId(userId)
                .title(reqDto.getTitle())
                .content(reqDto.getContent())
                .build();

        noteMapper.insertNote(note);
        return toRespDto(note);
    }

    @Transactional(rollbackFor = Exception.class)
    public void updateNote(Long userId, Long noteId, NoteReqDto reqDto) {
        int updatedCount = noteMapper.updateNote(noteId, userId, reqDto.getTitle(), reqDto.getContent());
        validateChangedCount(updatedCount);
    }

    @Transactional(rollbackFor = Exception.class)
    public void deleteNote(Long userId, Long noteId) {
        int deletedCount = noteMapper.deleteNote(noteId, userId);
        validateChangedCount(deletedCount);
    }

    private void validateChangedCount(int changedCount) {
        if (changedCount == 0) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "메모를 찾을 수 없습니다.");
        }
    }

    private NoteRespDto toRespDto(Note note) {
        return NoteRespDto.builder()
                .id(note.getId())
                .userId(note.getUserId())
                .title(note.getTitle())
                .content(note.getContent())
                .createdAt(note.getCreatedAt())
                .updatedAt(note.getUpdatedAt())
                .build();
    }
}
