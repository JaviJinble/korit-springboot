package com.korit.ch03.mapper;

import com.korit.ch03.entity.Category;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CategoryMapper {
    int insert(Category category);
    List<Category> selectAll();
    Category selectById(Long categoryId);
    Category selectByCategoryName(String categoryName);
}
