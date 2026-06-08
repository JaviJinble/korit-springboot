package com.korit.ch04api.mapper;

import com.korit.ch04api.entity.Todo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface TodoMapper {
    int insertTodo(Todo todo);
    List<Todo> selectTodosByUserId(@Param("userId") Long userId);
    int toggleTodoStatus(@Param("todoId") Long todoId, @Param("userId") Long userId);
}
