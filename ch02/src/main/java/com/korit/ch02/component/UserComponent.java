package com.korit.ch02.component;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserComponent {
    private final UserUtilComponent userUtilComponent;


    public void printUser() {
        System.out.println("사용자 정보 출력");
        userUtilComponent.print();
    }
}
