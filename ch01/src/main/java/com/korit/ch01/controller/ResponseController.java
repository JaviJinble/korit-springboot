package com.korit.ch01.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
public class ResponseController {

    @GetMapping("/api/resp1")
    public ResponseEntity<Map<String, String>> resp1() {
        return new ResponseEntity<>(Map.of("message","400 오류입니다."),HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/api/resp2")
    public ResponseEntity<Map<String, List<Integer>>> resp2() {
        return new ResponseEntity<>(Map.of("list", List.of(1, 2, 3, 4, 5)),HttpStatus.OK);
    }
}
