package com.korit.ch04api.security;

import com.korit.ch04api.entity.User;
import com.korit.ch04api.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserMapper userMapper;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);
        String provider = userRequest.getClientRegistration().getRegistrationId();

        OAuth2UserInfo oAuth2UserInfo = createOAuth2UserInfo(provider, oAuth2User);
        User user = getOrCreateUser(oAuth2UserInfo);

        return new PrioncipalUser(user, oAuth2UserInfo);
    }

    private OAuth2UserInfo createOAuth2UserInfo(String provider, OAuth2User oAuth2User) {
        if (provider.equalsIgnoreCase("google")) {
            return new GoogleUserInfo(oAuth2User.getAttributes());
        }
        if (provider.equalsIgnoreCase("naver")) {
            return new NaverUserInfo(oAuth2User.getAttributes());
        }
        if (provider.equalsIgnoreCase("kakao")) {
            return new KakaoUserInfo(oAuth2User.getAttributes());
        }
        throw new OAuth2AuthenticationException("지원하지 않는 OAuth2 provider입니다.");
    }

    private User getOrCreateUser(OAuth2UserInfo oAuth2UserInfo) {
        String username = oAuth2UserInfo.getProvider() + "_" + oAuth2UserInfo.getProviderId();
        User foundUser = userMapper.selectByUsername(username);
        if (foundUser != null) {
            return foundUser;
        }

        User user = User.builder()
                .username(username)
                .password("{oauth2}")
                .name(valueOrDefault(oAuth2UserInfo.getName(), oAuth2UserInfo.getProvider() + " user"))
                .email(valueOrDefault(oAuth2UserInfo.getEmail(), username + "@oauth2.local"))
                .roleId(1L)
                .build();

        userMapper.insert(user);
        return userMapper.selectByUsername(username);
    }

    private String valueOrDefault(String value, String defaultValue) {
        return value == null || value.isBlank() ? defaultValue : value;
    }
}
