package com.korit.ch02.Repository;

import com.korit.ch02.domain.Book;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Repository
public class BookRepository {

    private final Map<Long, Book> store = new HashMap<>();
    private Long sequence = 0L;

    public Book save(Book book) {
        Long id = ++sequence;

        Book savedBook = new Book(
                id,
                book.getTitle(),
                book.getAuthor(),
                book.getPrice()
        );

        store.put(id, savedBook);
        return savedBook;
    }

    public Optional<Book> findById(Long id) {
        return Optional.ofNullable(store.get(id));
    }

    public Collection<Book> findAll() {
        return store.values();
    }

    @PostConstruct
    public void init() {
        save(new Book(null, "자바의 정석", "남궁성", 30000));
        save(new Book(null, "스프링 입문", "김영한", 25000));
        save(new Book(null, "클린 코드", "로버트 마틴", 35000));
    }
}