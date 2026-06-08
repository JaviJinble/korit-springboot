package com.korit.ch04api.service;

import com.korit.ch04api.dto.TodoReqDto;
import com.korit.ch04api.dto.TodoRespDto;
import com.korit.ch04api.entity.Todo;
import com.korit.ch04api.mapper.TodoMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TodoService {

    private final TodoMapper todoMapper;

    public List<TodoRespDto> getTodos(Long userId) {
        List<Todo> todos = todoMapper.selectTodosByUserId(userId);
        return todos.stream().map(this::toRespDto).collect(Collectors.toList());
    }

    @Transactional(rollbackFor = Exception.class)
    public TodoRespDto addTodo(Long userId, TodoReqDto reqDto) {
        Todo todo = Todo.builder()
                .userId(userId)
                .content(reqDto.getContent())
                .build();
        
        todoMapper.insertTodo(todo);
        
        todo.setIsCompleted(false); // DB Default 값을 반영해 응답 구성
        return toRespDto(todo);
    }

    @Transactional(rollbackFor = Exception.class)
    public void toggleStatus(Long userId, Long todoId) {
        // Mapper 쿼리에 todoId와 userId 모두 넘겨서 소유자만 변경할 수 있도록 합니다.
        todoMapper.toggleTodoStatus(todoId, userId);
    }

    private TodoRespDto toRespDto(Todo todo) {
        return TodoRespDto.builder()
                .id(todo.getId())
                .userId(todo.getUserId())
                .content(todo.getContent())
                .isCompleted(todo.getIsCompleted())
                .createdAt(todo.getCreatedAt())
                .updatedAt(todo.getUpdatedAt())
                .build();
    }
}
