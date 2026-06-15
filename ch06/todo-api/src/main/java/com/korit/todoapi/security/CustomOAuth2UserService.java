package com.korit.todoapi.security;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User auth2User = super.loadUser(userRequest);
        System.out.println(auth2User.getAttributes());

        Collection<? extends GrantedAuthority> authorities = auth2User.getAuthorities();
        Map<String, Object> attributes = auth2User.getAttributes();
        String nameAttributeKey = "providerId";

        Map<String, Object> customAttributes = new HashMap<>();

        String provider = userRequest.getClientRegistration().getClientName().toLowerCase();
        if (provider.equals("google")) {
            customAttributes.put("provider", provider);
            customAttributes.put("providerId", attributes.get("sub"));
            customAttributes.put("email", attributes.get("email"));
            customAttributes.put("nickname", attributes.get("name"));
            customAttributes.put("profileImage", attributes.get("picture"));
        } else if (provider.equals("naver")) {
            Map<String, Object> response = (Map<String, Object>) attributes.get("response");
            customAttributes.put("provider", provider);
            customAttributes.put("providerId", response.get("id"));
            customAttributes.put("email", response.get("email"));
            customAttributes.put("nickname", response.get("name"));
            customAttributes.put("profileImage", response.get("profile_image"));
        } else if (provider.equals("kakao")) {
            Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
            Map<String, Object> profile = (Map<String, Object>) kakaoAccount.get("profile");
            customAttributes.put("provider", provider);
            customAttributes.put("providerId", String.valueOf((Long) attributes.get("id")));
            customAttributes.put("email", kakaoAccount.get("email"));
            customAttributes.put("nickname", profile.get("nickname"));
            customAttributes.put("profileImage", "");
        }

        OAuth2User customOAuth2User = new DefaultOAuth2User(authorities, customAttributes, nameAttributeKey);

        return customOAuth2User;
    }
}
