package com.korit.ch04api.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI openAPIConfig() {
        OpenAPI openAPI = new OpenAPI();

        Info info = new Info();
        info.title("CH04 API");
        info.version("1.0");
        info.description("JWT/OAuth2 인증, Todo, 메모, 첨부파일, 내 정보 API 문서입니다. JSON API는 ApiResponse<T> 형식으로 응답하며, 파일 다운로드 성공 응답만 바이너리 스트림을 반환합니다.");

        SecurityRequirement securityRequirement = new SecurityRequirement();
        securityRequirement.addList("Bearer Authentication");

        SecurityScheme securityScheme = new SecurityScheme();
        securityScheme.name("Bearer Authentication");
        securityScheme.type(SecurityScheme.Type.HTTP);
        securityScheme.scheme("bearer");
        securityScheme.bearerFormat("JWT");

        Components components = new Components();
        components.addSecuritySchemes("Bearer Authentication", securityScheme);

        return openAPI
                .info(info)
                .addSecurityItem(securityRequirement)
                .components(components);
    }
}
