package com.korit.ch05api.security;

import java.util.Map;

public interface OAuth2UserInfo {
    String getProviderId();
    String getProvider();
    String getEmail();
    String getName();

    default Map<String, Object> getAttributes() {
        return Map.of(
                "providerId", getProviderId(),
                "provider", getProvider(),
                "email", getEmail(),
                "name", getName()
        );
    }
}
