package com.korit.ch01.controller.customer;

import com.korit.ch01.controller.customer.dto.CustomerReqCreate;
import com.korit.ch01.controller.customer.dto.CustomerResp;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@CrossOrigin
@RequestMapping("/api/customers")
public class CustomerController {

    @PostMapping
    public ResponseEntity<CustomerResp> create(@RequestBody CustomerReqCreate dto) {

        return ResponseEntity.ok(new CustomerResp(1, "test1234", "test@gmail.com", "010-1234-5678", LocalDateTime.now(), LocalDateTime.now()));
    }
}
