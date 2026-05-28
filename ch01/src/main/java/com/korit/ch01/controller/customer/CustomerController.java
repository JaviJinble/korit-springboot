package com.korit.ch01.controller.customer;

import com.korit.ch01.controller.customer.dto.CustomerReqCreate;
import com.korit.ch01.controller.customer.dto.CustomerReqList;
import com.korit.ch01.controller.customer.dto.CustomerReqUpdate;
import com.korit.ch01.controller.customer.dto.CustomerResp;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/customers")
public class CustomerController {

    @PostMapping
    public ResponseEntity<CustomerResp> create(@RequestBody CustomerReqCreate dto) {

        return ResponseEntity.ok(new CustomerResp(1, "test1234", "test@gmail.com", "010-1234-5678", LocalDateTime.now(), LocalDateTime.now()));
    }

    @GetMapping("/dto")
    public ResponseEntity<List<CustomerResp>> listByDto(CustomerReqList dto) {
        return ResponseEntity.ok(List.of());
    }

    @GetMapping("/{customerId}")
    public ResponseEntity<CustomerResp> getOne(@PathVariable int customerId) {
        return ResponseEntity.ok(null);
    }

    @PutMapping("/{customerId}")
    public ResponseEntity<CustomerResp> update(@RequestBody CustomerReqUpdate dto) {
        return ResponseEntity.ok(null);
    }

    @PatchMapping("/{customerId}")
    public ResponseEntity<CustomerResp> modify(@RequestBody CustomerReqUpdate dto) {
        return ResponseEntity.ok(null);
    }
}
