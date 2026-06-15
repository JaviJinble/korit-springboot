package com.korit.todoapi.mapper;

import com.korit.todoapi.dto.todo.TodoSearchCondition;
import com.korit.todoapi.entity.Todo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface TodoMapper {
    int insert(Todo todo);
    List<Todo> selectAllByUserId(Long Id);
    List<Todo> selectAllByUserIdAndCondition(Long userId, TodoSearchCondition condition);
    Todo selectByIdAndUserId(@Param("id") Long id, @Param("userId") Long userId);
    int update (Todo todo);
    int deleteByIdAndUserId(@Param("id") Long id, @Param("userId") Long userId);
    int updateComplete(Todo todo);
    int updateFlag(Todo todo);
}
