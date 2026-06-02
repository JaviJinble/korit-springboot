package com.korit.ch03.mapper;

import com.korit.ch03.entity.Product;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ProductMapper {
    int insert(Product product);
    List<Product> selectAll();
    Product selectById(Long productId);
    Product selectByProductName(String productName);
}
