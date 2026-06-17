package com.korit.todoapi.security.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Base64;
import java.util.Date;

@Component
public class JwtProvider {

//    @Value("${jwt}")
//    private String secret;

    private SecretKey key;

    public JwtProvider(@Value("${jwt}") String secret) {
        key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

//    @PostConstruct
//    public void setKey() {
//        key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
//    }

    public String createToken(String id) {
        return Jwts.builder()
                .id(id)
                .expiration(new Date(new Date().getTime() + (60000l * 60l * 24l)))
                .signWith(key, Jwts.SIG.HS512)
                .compact();
    }

    public Jws<Claims> parseAndValidate(String token) {
        return Jwts.parser().verifyWith(key).build().parseSignedClaims(token);
    }

}












