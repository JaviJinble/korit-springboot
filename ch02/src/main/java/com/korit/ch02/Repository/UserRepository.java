package com.korit.ch02.Repository;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

@Repository
public class UserRepository {
    public void print() {
        System.out.println("Repository출력");
    }
}
