package com.korit.todoapi.security.jwt;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Component
public class JwtProvider {

    @Value("${jwt.secret}")
    private String secret;

    private Key key;

    @PostConstruct
    public void setKey() {
        key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

//    public String createToken(String id) {
//        return Jwts.builder()
//                .id(id)
//                .expiration(new Date(new Date().getTime() + (60000l * 60l * 24l)))
//                .signWith(key, Jwts.SIG.HS512)
//                .compact();
//    }

}
