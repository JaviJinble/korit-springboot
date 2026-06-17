package com.korit.todoapi;

import com.korit.todoapi.entity.User;
import com.korit.todoapi.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@SpringBootTest
class TodoApiApplicationTests {

    @Autowired
    private UserMapper userMapper;

    @Test
    @Transactional
    void contextLoads() {
        User user = User.builder()
                .email("test@gmail.com")
                .nickname("test")
                .profileImage("http://test.com/test.png")
                .provider("google")
                .providerId("test12344365k3456i98d9")
                .createdAt(LocalDateTime.now())
                .build();
        userMapper.insert(user);

        System.out.println(user);
    }

}
