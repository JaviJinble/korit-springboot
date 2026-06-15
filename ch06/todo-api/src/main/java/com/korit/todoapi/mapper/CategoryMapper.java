package com.korit.todoapi.mapper;

import com.korit.todoapi.entity.Category;
import com.korit.todoapi.entity.CategoryCompletionCounts;
import com.korit.todoapi.entity.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface CategoryMapper {
    int insert(Category category);
    List<CategoryCompletionCounts> countNotCompletedByUserId(Long userId);
    List<Category> selectAllByUserId(Long userId);
    Category selectByIdAndUserId(@Param("id") Long id, @Param("userId") Long userId);
    int update(Category category);
    int deleteByIdAndUserId(@Param("id") Long id, @Param("userId") Long userId);
    Category selectByUserIdAndName(@Param("userId") Long userId, @Param("name") String name);

}
