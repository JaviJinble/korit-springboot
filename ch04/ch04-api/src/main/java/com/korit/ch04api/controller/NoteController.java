package com.korit.ch04api.controller;

import com.korit.ch04api.dto.ApiResponse;
import com.korit.ch04api.dto.NoteReqDto;
import com.korit.ch04api.dto.NoteRespDto;
import com.korit.ch04api.security.PrioncipalUser;
import com.korit.ch04api.service.NoteService;
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
public class NoteController {

    private final NoteService noteService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<NoteRespDto>>> getNotes(
            @AuthenticationPrincipal PrioncipalUser principalUser
    ) {
        Long userId = principalUser.getUser().getId();
        return ResponseEntity.ok(ApiResponse.success(noteService.getNotes(userId)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<NoteRespDto>> addNote(
            @AuthenticationPrincipal PrioncipalUser principalUser,
            @Valid @RequestBody NoteReqDto reqDto
    ) {
        Long userId = principalUser.getUser().getId();
        return ResponseEntity.ok(ApiResponse.success(noteService.addNote(userId, reqDto)));
    }

    @PutMapping("/{noteId}")
    public ResponseEntity<ApiResponse<Void>> updateNote(
            @AuthenticationPrincipal PrioncipalUser principalUser,
            @PathVariable Long noteId,
            @Valid @RequestBody NoteReqDto reqDto
    ) {
        Long userId = principalUser.getUser().getId();
        noteService.updateNote(userId, noteId, reqDto);
        return ResponseEntity.ok(ApiResponse.success());
    }

    @DeleteMapping("/{noteId}")
    public ResponseEntity<ApiResponse<Void>> deleteNote(
            @AuthenticationPrincipal PrioncipalUser principalUser,
            @PathVariable Long noteId
    ) {
        Long userId = principalUser.getUser().getId();
        noteService.deleteNote(userId, noteId);
        return ResponseEntity.ok(ApiResponse.success());
    }
}
