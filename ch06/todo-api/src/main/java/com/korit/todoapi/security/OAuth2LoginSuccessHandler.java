package com.korit.todoapi.security;

import com.korit.todoapi.entity.User;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
//    private final UserMapper userMapper;
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        System.out.println(authentication.getPrincipal());
        OAuth2User auth2User = (OAuth2User) authentication.getPrincipal();

//        User user = userMapper.selectByProviderId(auth2User.getName());
//        if (user == null) {
//              Map<String, Object> attributes = auth2User.getAttributes();
//              user = User.builder().
//
//                      .build();
//              userMapper.insert(user);
//        }


//        String target = UriComponentsBuilder.fromUriString("http://localhost:5173/auth/oauth2/callback")
//                .queryParam("accessToken", accessToken)
//                .build().toUriString();
//        getRedirectStrategy().sendRedirect(request, response, target);
    }
}
