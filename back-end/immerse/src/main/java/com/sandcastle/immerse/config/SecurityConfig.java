package com.sandcastle.immerse.config;
import com.sandcastle.immerse.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final UserService userServiceImpl;

	@Value("${application.jwt.password}")
    private String secretKey;

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
		return httpSecurity
			.httpBasic().disable()
			.csrf().disable()
			.cors().and()
			.authorizeRequests()
			.antMatchers("/swagger-ui/**", "/api-docs/**").permitAll()
			.antMatchers("/user/signup", "/user/signin", "/user/mypage/**", "/user/check/**").permitAll()
			.antMatchers("/search/user/**", "/search/show/**").permitAll()
			.antMatchers("/subscribe/follower/**", "/subscribe/following/**").permitAll()
			.antMatchers("/categories/").permitAll()
			.antMatchers(HttpMethod.GET,"/shows/**").permitAll()
			.antMatchers(HttpMethod.GET, "/tag/**").permitAll()
			.anyRequest().authenticated()
			.and()
			.sessionManagement()
			.sessionCreationPolicy(SessionCreationPolicy.STATELESS) // jwt를 사용하는 경우
			.and()
			.addFilterBefore(new JwtFilter(userServiceImpl, secretKey), UsernamePasswordAuthenticationFilter.class)
			.build();
	}

}
