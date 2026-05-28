package com.korit.ch02.controller;

import com.korit.ch02.component.UserComponent;
import com.korit.ch02.component.UserUtilComponent;
import com.korit.ch02.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RequestMapping("/api/users")
@RestController
@RequiredArgsConstructor
public class UserController {
    private final UserComponent userComponent;
    private final UserService userService;


    @GetMapping
    public ResponseEntity<?> get() {
        userComponent.printUser();
        return ResponseEntity.status(200).build();
    }

    @GetMapping("/print")
    public ResponseEntity<?> print() {
        userComponent.printUser();
        return ResponseEntity.status(200).build();
    }

}
