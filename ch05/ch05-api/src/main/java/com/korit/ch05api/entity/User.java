package com.korit.ch05api.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class User {
    private Long id;
    private String name;
    private String email;
    private String provider; // google, naver, kakao
    private String providerId; // sub, id
    private Long roleId;
    private Role role;
}
