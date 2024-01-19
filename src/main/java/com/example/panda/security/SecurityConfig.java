// title : SecurityConfig
// 설명 : 스프링 시큐리티 사용을 위한 filterChain
//      비밀번호 암호화를 위한 passwordEncoder()
// 작성자 : 심상혁
// 생성일 : 2023.05.16
// 업데이트 : -
package com.example.panda.security;

import com.example.panda.service.CustomUserDetailsService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import java.io.IOException;
import java.util.Arrays;

@Configuration
@EnableWebSecurity
@EnableWebMvc
@Component
@RequiredArgsConstructor
public class SecurityConfig {
    private final CustomUserDetailsService userDetailsService;

    private final AuthenticationFailureHandler customFailureHandler;

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        // 비밀번호 함호화를 위한 BCryptPasswordEncoder 빈
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        http
                .httpBasic().disable()  // https만 사용
                .cors().configurationSource(corsConfigurationSource())
                .and()
                .csrf().disable()
                .authorizeHttpRequests((authz) -> authz
                        .requestMatchers("http://localhost:8000/chat", "/logout","/api/searchResult**","/api/todayAds", "/login", "/check","/pages/SearchResult**", "/", "/pages/loginPage", "/pages/joinMemPage", "/sign/**", "/login/**","/notice/**").permitAll()
                        .anyRequest().authenticated());
        http.formLogin()
                .loginPage("http://localhost:8000/login").usernameParameter("email").passwordParameter("password")
                .failureHandler(customFailureHandler).successHandler(new AuthenticationSuccessHandler() {
                    @Override
                    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
                        response.sendRedirect("/");
                    }
                }).loginProcessingUrl("/login").defaultSuccessUrl("/",true);
        http.logout().logoutSuccessUrl("/").deleteCookies("JSESSIONID");
        http.userDetailsService(userDetailsService);
        return http.build();
    }
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOriginPatterns(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("HEAD","POST","GET","DELETE","PUT"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}