package com.korit.ch02.service;

import com.korit.ch02.Repository.BookRepository;
import com.korit.ch02.domain.Book;
import com.korit.ch02.dto.BookCreateRequest;
import com.korit.ch02.dto.BookResponse;
import com.korit.ch02.exception.BookNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepository bookRepository;

    public List<BookResponse> getBooks() {
        return bookRepository.findAll()
                .stream()
                .map(BookResponse::from)
                .toList();
    }

    public BookResponse getBook(Long id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new BookNotFoundException(id));

        return BookResponse.from(book);
    }

    public BookResponse createBook(BookCreateRequest request) {
        Book book = new Book(
                null,
                request.title(),
                request.author(),
                request.price()
        );

        Book savedBook = bookRepository.save(book);

        return BookResponse.from(savedBook);
    }
}