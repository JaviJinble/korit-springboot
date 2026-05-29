package com.korit.ch02.dto;

import com.korit.ch02.domain.Book;

public record BookResponse(
        Long id,
        String title,
        String author,
        int price
) {

    public static BookResponse from(Book book) {
        return new BookResponse(
                book.getId(),
                book.getTitle(),
                book.getAuthor(),
                book.getPrice()
        );
    }
}