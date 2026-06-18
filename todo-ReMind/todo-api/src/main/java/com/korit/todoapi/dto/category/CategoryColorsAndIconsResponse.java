package com.korit.todoapi.dto.category;

import com.korit.todoapi.entity.CategoryColor;
import com.korit.todoapi.entity.CategoryIcon;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class CategoryColorsAndIconsResponse {
    private List<CategoryColor> categoryColors;
    private List<CategoryIcon> categoryIcons;
}
