package com.korit.ch03.controller.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserResp {
    private Long id;
    private String username;
    private String name;
    private String email;
    private LocalDateTime createAt;
}
