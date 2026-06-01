package com.korit.ch03.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserResp {
    private Long id;
    private String username;
    private String name;
    private String email;
    private List<UserResp.Role> roles;

    @Data
    @AllArgsConstructor
    public static class Role {
        private Long roleId;
        private String roleName;
    }
}
