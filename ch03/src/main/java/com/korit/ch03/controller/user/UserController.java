package com.korit.ch03.controller.user;

import com.korit.ch03.controller.user.dto.UserReqCreate;
import com.korit.ch03.controller.user.dto.UserResp;
import com.korit.ch03.service.UserSevice;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/users")
@RestController
@RequiredArgsConstructor
public class UserController {
    private final UserSevice userSevice;

    @PostMapping
    public ResponseEntity<UserResp> create(@RequestBody UserReqCreate dto) {

        return ResponseEntity.ok(userSevice.create(dto));
    }
}
