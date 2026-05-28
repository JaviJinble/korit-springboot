package com.korit.ch02.Repository;

import com.korit.ch02.entity.Product;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class ProductRepository {
    public Optional<Product> findById(Long productId) {
        Product product = new Product();
        product.setId(productId);
        product.setName("노트북");

        return Optional.of(product);
    }
}
