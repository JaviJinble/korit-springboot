package com.korit.ch01.controller;

import com.korit.ch01.dto.RestaurantDto;
import com.korit.ch01.dto.StudentDto;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
public class RequestController {

    @GetMapping("/api/get/params")
    public Object req1(HttpServletRequest request) {
        System.out.println(request.getParameter("name"));

        return "";
    }

    @GetMapping("/api/get/params2")
    public Object req2(@RequestParam String name,
                       @RequestParam int age) {
        System.out.println(name);
        System.out.println(age);
        return "";
    }

    @GetMapping("/api/get/params/dto")
    public Object req3(StudentDto dto) {
        System.out.println(dto);
        return "";
    }

    @PostMapping("/api/post/body")
    public Object req4(@RequestBody StudentDto dto) {
        System.out.println(dto);
        return "";
    }

    @PostMapping("/api/restaurants")
    @ResponseBody
    public Map<String, Object> registerRestaurant(@RequestBody RestaurantDto dto){
        System.out.println(dto);

        System.out.println("식당명: " + dto.name());
        System.out.println("카테고리: " + dto.category());
        System.out.println("주소: " + dto.address());
        System.out.println("평점: " + dto.rating());

//        restaurantList.add(dto);
        return Map.of("message", "등록 완료");
    }
    private List<RestaurantDto> restaurantList = new ArrayList<>();

    @GetMapping("/api/restaurants")
    @ResponseBody
    public List<RestaurantDto> getRestaurants() {
        return restaurantList;
    }
}
