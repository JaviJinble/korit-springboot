package com.korit.ch03.domain.role.controller;

import com.korit.ch03.common.dto.ApiResponse;
import com.korit.ch03.domain.role.dto.RoleReqCreate;
import com.korit.ch03.domain.role.dto.RoleResp;
import com.korit.ch03.domain.role.service.RoleSevice;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/roles")
@CrossOrigin
@RequiredArgsConstructor
public class RoleController { // 1
    private final RoleSevice roleSevice; // 11

    @PostMapping
    public ResponseEntity<ApiResponse<RoleResp>> create(@RequestBody RoleReqCreate dto) {
        System.out.println(dto);
        roleSevice.create(dto);
        RoleResp roleResp = roleSevice.create(dto);

        return ResponseEntity.ok(ApiResponse.ok(roleResp));
    }

    @GetMapping
    public ResponseEntity<List<RoleResp>> getAll() {
        return ResponseEntity.ok(roleSevice.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<RoleResp> getRole(@PathVariable Long id) {

        return ResponseEntity.ok(roleSevice.getRole(id));
    }
}
