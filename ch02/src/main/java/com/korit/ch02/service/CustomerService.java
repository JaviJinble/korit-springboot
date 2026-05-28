package com.korit.ch02.service;

import com.korit.ch02.Repository.CustomerRepository;
import com.korit.ch02.component.CustomerUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomerService {
    private final CustomerRepository customerRepository;
    private final CustomerUtil customerUtil;

}
