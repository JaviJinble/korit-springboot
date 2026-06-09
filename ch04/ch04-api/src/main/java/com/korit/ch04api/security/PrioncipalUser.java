package com.korit.ch04api.security;

import com.korit.ch04api.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.Nullable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class PrioncipalUser implements UserDetails, OAuth2User {
    private final User user;
    private OAuth2UserInfo oAuth2UserInfo;

    @Override
    public Map<String, Object> getAttributes() {
        if (oAuth2UserInfo == null) {
            return Map.of();
        }

        return oAuth2UserInfo.getAttributes();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if (user == null) {
            return List.of();
        }
        return List.of(new SimpleGrantedAuthority(user.getRole().getRoleName()));
    }

    @Override
    public @Nullable String getPassword() {
        return "";
    }

    @Override
    public String getUsername() {
        return "";
    }

    @Override
    public String getName() {
        if (oAuth2UserInfo == null) {
            return user == null ? "" : String.valueOf(user.getId());
        }
        return oAuth2UserInfo.getProviderId();
    }
}
