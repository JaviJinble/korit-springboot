package com.korit.ch02.cache;

import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class CacheManager {
    private final Map<String, String> cache = new HashMap<>();

    public CacheManager() {
        System.out.println("캐시 초기화 완료");
    }

    @PostConstruct
    public void init() {
        // "user:1" → "김준일", "user:2" → "이영희"
        cache.put("user:1", "김명준");
        cache.put("user:2", "이영희");
    }

    public String get(String key) {
        return cache.get(key);
    }

    @PreDestroy
    public void destroy() {
        System.out.printf("캐시 비우는 중... 총 %d건 삭제\n", cache.size());
        cache.clear();
    }
}
