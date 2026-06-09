package com.korit.ch05api.security;

import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User auth2User = super.loadUser(userRequest);
        System.out.println(auth2User.getAttributes());
        System.out.println(userRequest.getClientRegistration().getClientName());

        OAuth2UserInfo oAuth2UserInfo = null;
        if (userRequest.getClientRegistration().getClientName().equalsIgnoreCase("google")) {
            oAuth2UserInfo = new GoogleUserInfo(auth2User.getAttributes());
        } else if (userRequest.getClientRegistration().getClientName().equalsIgnoreCase("naver")) {
            oAuth2UserInfo = new NaverUserInfo(auth2User.getAttributes());
        } else if (userRequest.getClientRegistration().getClientName().equalsIgnoreCase("kakao")) {
            oAuth2UserInfo = new KakaoUserInfo(auth2User.getAttributes());
        }

        return new DefaultOAuth2User(auth2User.getAuthorities(), oAuth2UserInfo.getAttributes(), "providerId");
    }

}