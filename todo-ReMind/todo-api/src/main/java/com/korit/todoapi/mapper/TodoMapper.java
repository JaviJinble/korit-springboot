package com.korit.todoapi.mapper;

import com.korit.todoapi.entity.Todo;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface TodoMapper {
    int insert(Todo todo);
    Todo selectById(Long todoId);
    List<Todo> selectAll();
    int update(Todo todo);
    int updateCompleted(Long todoId, boolean isCompleted);
    int delete(Long todoId);

}
