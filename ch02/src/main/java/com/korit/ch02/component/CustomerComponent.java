package com.korit.ch02.component;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class CustomerComponent {
    private final CustomerUtilComponent customerUtilComponent;
}
