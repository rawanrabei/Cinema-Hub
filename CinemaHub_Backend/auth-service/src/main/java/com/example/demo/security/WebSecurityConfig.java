package com.example.demo.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.example.demo.service.CustomUserDetailsService;

@Configuration
public class WebSecurityConfig {

    @Autowired
    CustomUserDetailsService userDetailsService;

    @Autowired
    private AuthEntryPointJwt unauthorizedHandler;

    @Bean
    public AuthTokenFilter authenticationJwtTokenFilter() {
        return new AuthTokenFilter();
    }

    @Bean
    AuthenticationManager authenticationManager(
            AuthenticationConfiguration authenticationConfiguration
    ) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> cors.disable())
            .exceptionHandling(e -> 
                e.authenticationEntryPoint(unauthorizedHandler)
            )
            .sessionManagement(s -> 
                s.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            .authorizeHttpRequests(auth -> 
                auth
                    .requestMatchers("/register", "/login", "/welcome").permitAll()
                    .requestMatchers("/api/v1/auth/**", "/api/v1/welcome").permitAll()
                    .requestMatchers("/api/auth/**").permitAll()
                    .requestMatchers("/api/v1/admin/**").hasRole("ADMIN")
                    .requestMatchers("/api/v1/manager/**").hasAnyRole("ADMIN", "MANAGER")
                    .requestMatchers("/api/v1/user/**").hasAnyRole("ADMIN", "MANAGER", "USER")
                    .anyRequest().authenticated()
            );

        http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}