package com.korit.todoapi.security;

import com.korit.todoapi.entity.Category;
import com.korit.todoapi.entity.User;
import com.korit.todoapi.mapper.CategoryMapper;
import com.korit.todoapi.mapper.UserMapper;
import com.korit.todoapi.security.jwt.JwtProvider;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.cglib.core.Local;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final UserMapper userMapper;
    private final CategoryMapper categoryMapper;
    private final JwtProvider jwtProvider;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        System.out.println(authentication.getPrincipal());
        OAuth2User auth2User = (OAuth2User) authentication.getPrincipal();

        User user = userMapper.selectByProviderId(auth2User.getName());
        if (user == null) {
            Map<String, Object> attributes = auth2User.getAttributes();
            user = User.builder()
                    .email((String) attributes.get("email"))
                    .nickname((String) attributes.get("nickname"))
                    .profileImage((String) attributes.get("profileImage"))
                    .provider((String) attributes.get("provider"))
                    .providerId((String) attributes.get("providerId"))
                    .createdAt(LocalDateTime.now())
                    .build();
            userMapper.insert(user);
            Category category = Category.builder()
                    .name("미분류")
                    .color("#222222")
                    .createdAt(LocalDateTime.now())
                    .build();
            categoryMapper.insert(category);
        }

        String target = UriComponentsBuilder.fromUriString("http://localhost:5173/auth/oauth2/callback")
                .queryParam("accessToken", jwtProvider.createToken(String.valueOf(user.getId())))
                .build().toUriString();

        getRedirectStrategy().sendRedirect(request, response, target);

    }

}
