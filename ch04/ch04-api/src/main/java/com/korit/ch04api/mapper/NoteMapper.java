package com.korit.ch04api.mapper;

import com.korit.ch04api.entity.Note;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface NoteMapper {
    int insertNote(Note note);
    List<Note> selectNotesByUserId(@Param("userId") Long userId);
    int updateNote(
            @Param("noteId") Long noteId,
            @Param("userId") Long userId,
            @Param("title") String title,
            @Param("content") String content
    );
    int deleteNote(@Param("noteId") Long noteId, @Param("userId") Long userId);
}
