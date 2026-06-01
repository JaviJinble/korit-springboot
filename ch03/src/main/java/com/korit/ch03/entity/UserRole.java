package com.korit.ch03.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserRole {
    private Long id;
    private Long userId;
    private Long roleId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    private Role role;
}
