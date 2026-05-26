package com.korit.ch01.controller;

import com.korit.ch01.dto.UserDto;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Map;
import java.util.Objects;

@Controller
public class HelloController {

    @GetMapping("/api/hello")
    public String hello() {
        return "/hello.html";
    }

    @GetMapping("/api/hello2")
    @ResponseBody
    public String hello2() {
        return "데이터 응답";
    }

    @GetMapping("/api/hello3")
    @ResponseBody
    public Map<String, Object> hello3() {
        return Map.of(
                "name", "김명준",
                "age", 33
        );
    }

    @GetMapping("/api/hello4")
    @ResponseBody
    public List<Map<String, Object>> hello4() {
        return List.of(
                Map.of(
                        "name", "김명준",
                        "age", 29
                ),
                Map.of(
                        "name", "홍길동",
                        "age", 30
                ),
                Map.of(
                        "name", "김명명",
                        "age", 31
                )
        );
    }

    @GetMapping("/api/hello5")
    @ResponseBody
    public List<UserDto> hello5() {
        return List.of(
                new UserDto(
                        "javi01",
                        "1234",
                        "김명준",
                        "bubaragi23@gmail.com"
                ),
                new UserDto(
                        "hong01",
                        "1111",
                        "홍길동",
                        "hong@gmail.com"
                ),
                new UserDto(
                        "kim01",
                        "2222",
                        "김명명",
                        "kim@gmail.com"
                )
        );
    }

}
