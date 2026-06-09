package com.korit.ch05api.security;

import com.korit.ch05api.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
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
public class PrioncipalUser implements UserDetails, OAuth2User {
    private User user;
    private OAuth2UserInfo oAuth2UserInfo;

    @Override
    public Map<String, Object> getAttributes() {

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
        return oAuth2UserInfo.getProviderId();
    }
}
