package com.korit.ch04api.security;


import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;


@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtUtil jwtUtil;

    @Value("${app.oauth2.redirect-uri:http://localhost:5173/oauth2/redirect}")
    private String frontRedirectUri;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        PrioncipalUser principalUser = (PrioncipalUser) authentication.getPrincipal();
        String accessToken = jwtUtil.createToken(principalUser.getUser().getId());
        String encodedToken = URLEncoder.encode(accessToken, StandardCharsets.UTF_8);

        clearAuthenticationAttributes(request);
        getRedirectStrategy().sendRedirect(request, response, frontRedirectUri + "?accessToken=" + encodedToken);
    }
}
