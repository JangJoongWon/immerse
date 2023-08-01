package com.sandcastle.immerse.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import lombok.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;

/**
 * Swagger springdoc-ui 구성 파일
 */
@Configuration
public class SwaggerdocsConfig {
    @Bean
    public OpenAPI openAPI() {

        Info info = new Info()
                .title("Example API 문서") // 타이틀
//                .version(version) // 문서 버전 // openAPI의 인자값으로 '@Value("${springdoc.version}") String version' 넣고 주석 없애면 됨
                .description("잘못된 부분이나 오류 발생 시 바로 말씀해주세요.") // 문서 설명
                .contact(new Contact() // 연락처
                        .name("beekei")
                        .email("beekei.shin@gmail.com")
                        .url("https://devbksheen.tistory.com/"));

        // Security 스키마 설정
        SecurityScheme bearerAuth = new SecurityScheme()
                .type(SecurityScheme.Type.HTTP)
                .scheme("bearer")
                .bearerFormat("JWT")
                .in(SecurityScheme.In.HEADER)
                .name(HttpHeaders.AUTHORIZATION);

        // Security 요청 설정
        SecurityRequirement addSecurityItem = new SecurityRequirement();
        addSecurityItem.addList("JWT");

        return new OpenAPI()
                // Security 인증 컴포넌트 설정
                .components(new Components().addSecuritySchemes("JWT", bearerAuth))
                // API 마다 Security 인증 컴포넌트 설정
                .addSecurityItem(addSecurityItem)
                .info(info);
    }

}
