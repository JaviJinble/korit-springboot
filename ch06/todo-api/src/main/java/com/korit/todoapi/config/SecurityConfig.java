package com.korit.todoapi.config;

import com.korit.todoapi.security.CustomOAuth2UserService;
import com.korit.todoapi.security.OAuth2LoginSuccessHandler;
import com.korit.todoapi.security.jwt.JwtFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtFilter jwtFilter;
    private final CustomOAuth2UserService customOAuth2UserService;
    private final OAuth2LoginSuccessHandler oAuth2LoginSuccessHandler;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) {
        http.csrf(csrf -> csrf.disable());

        http.sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        http.oauth2Login(oauth2 -> oauth2
                .userInfoEndpoint(ui -> ui.userService(customOAuth2UserService))
                .successHandler(oAuth2LoginSuccessHandler)
        );

        http.authorizeHttpRequests(req -> {
            req.requestMatchers("/", "/login/**", "/oauth2/**").permitAll();
            req.requestMatchers("/swagger-ui/**", "/v3/api-docs/**", "/api/auth/**").permitAll();
            req.anyRequest().authenticated();
        });

        return http.build();
    }

}
