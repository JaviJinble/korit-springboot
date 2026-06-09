package com.korit.ch04api.security;

import java.util.Map;

public class KakaoUserInfo implements OAuth2UserInfo{
    private final String id;
    private final Map<String, Object> properties;
    private final Map<String, Object> kakaoAccount;

    public KakaoUserInfo(Map<String, Object> attributes) {
        this.id = Long.toString((Long) attributes.get("id"));
        this.properties = (Map<String, Object>) attributes.get("properties");
        this.kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
    }

    @Override
    public String getProviderId() {return id;}

    @Override
    public String getProvider() {
        return "kakao";
    }

    @Override
    public String getEmail() {
        return (String) kakaoAccount.get("email");
    }

    @Override
    public String getName() {
        return (String) properties.get("nickname");
    }
}
