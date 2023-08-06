package com.sandcastle.immerse.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

	@Override
	public void addCorsMappings(CorsRegistry registry) {

		registry.addMapping("/**")
			.allowedOrigins("http://localhost:3000",
				"http://i9d203.p.ssafy.io:3000",
				"https://i9d203.p.ssafy.io")
			.allowedMethods(
				HttpMethod.GET.name(),
				HttpMethod.HEAD.name(),
				HttpMethod.POST.name(),
				HttpMethod.DELETE.name(),
				HttpMethod.PUT.name());
	}
}
