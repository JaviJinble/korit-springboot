package com.korit.todoapi.entity;

import com.korit.todoapi.dto.user.MeResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {
    private Long id;
    private String email;
    private String nickname;
    private String profileImage;
    private String provider;
    private String providerId;
    private LocalDateTime createdAt;

    public MeResponse toMe() {
        return MeResponse.builder()
                .userId(id)
                .email(email)
                .nickname(nickname)
                .profileImage(profileImage)
                .provider(provider)
                .build();
    }
}
