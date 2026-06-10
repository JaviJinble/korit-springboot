package com.korit.ch05api.security;


import com.korit.ch05api.entity.User;
import com.korit.ch05api.mapper.UserMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;


@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final UserMapper userMapper;
    private final JwtUtil jwtUtil;

    @Value("${app.oauth2.redirect-uri}")
    private String redirectUrl;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        User user = userMapper.selectByProviderId(oAuth2User.getAttribute("providerId"));
        if (user == null) {
            user = User.builder()
                    .email(oAuth2User.getAttribute("email"))
                    .name(oAuth2User.getAttribute("name"))
                    .provider(oAuth2User.getAttribute("provider"))
                    .providerId(oAuth2User.getAttribute("providerId"))
                    .roleId(1l)
                    .build();
            userMapper.insert(user);
        }
        String accessToken = jwtUtil.createToken(user.getId());

        String target = UriComponentsBuilder.fromUriString(redirectUrl)
                .queryParam("accessToken", accessToken)
                .build().toUriString();


        getRedirectStrategy().sendRedirect(request, response, target);

    }
}