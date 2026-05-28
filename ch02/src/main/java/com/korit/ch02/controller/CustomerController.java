package com.korit.ch02.controller;

import com.korit.ch02.component.CustomerComponent;
import com.korit.ch02.component.CustomerUtil;
import com.korit.ch02.service.CustomerService;
import com.korit.ch02.service.PhoneService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RequiredArgsConstructor
@RequestMapping("/api/customers")
@CrossOrigin
@RestController
public class CustomerController {
    private final CustomerComponent customerComponent;
    private final CustomerService customerService;
    private final CustomerUtil customerUtil;
    private final PhoneService phoneServiceImpl;
    private final PhoneService smartPhoneServiceImpl;

}
