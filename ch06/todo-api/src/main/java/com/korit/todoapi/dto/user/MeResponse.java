package com.korit.todoapi.dto.user;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MeResponse {
    private Long userId;
    private String email;
    private String nickname;
    private String profileImage;
    private String provider;
}
