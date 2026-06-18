package com.korit.todoapi.mapper;

import com.korit.todoapi.entity.Category;
import com.korit.todoapi.entity.CategoryColor;
import com.korit.todoapi.entity.CategoryCompletionCount;
import com.korit.todoapi.entity.CategoryIcon;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CategoryMapper {
    int insert(Category category);
    Category selectById(Long categoryId);
    Category selectByNameAndUserId(String name, Long userId);
    List<Category> selectAllByUserId(Long userId);
    int update(Category category);
    int delete(Long categoryId);
    List<CategoryCompletionCount> countNotCompletedByUserId(Long userId);
    List<CategoryColor> selectAllCategoryColor();
    List<CategoryIcon> selectAllCategoryIcon();
}
