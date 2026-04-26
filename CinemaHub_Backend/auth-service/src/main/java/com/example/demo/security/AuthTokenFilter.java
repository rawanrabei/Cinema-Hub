package com.example.demo.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.demo.service.CustomUserDetailsService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

import java.io.IOException;


@Component
@Slf4j
public class AuthTokenFilter extends OncePerRequestFilter {

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                         HttpServletResponse response,
                        FilterChain filterChain)
                        throws ServletException, IOException{
                            String path = request.getServletPath();

                            // 🚪 PUBLIC ROUTES BYPASS
                            if (path.startsWith("/api/v1/auth")
                                || path.startsWith("/api/v1/welcome")
                                || path.startsWith("/api/v1/hello")
                                || path.equals("/api/auth/register")
                                || path.equals("/api/auth/login")
                                || path.equals("/api/auth/logout")) {
                                filterChain.doFilter(request, response);
                                return;
                            }

                            // 🚪 USER ROUTES (protected by Spring Security, not bypassed)
                            // These routes will be validated by WebSecurityConfig

                            try {
                                String jwt = parseJwt(request);
                                if (jwt != null && jwtUtil.validateJwtToken(jwt)){


                                    final String username = jwtUtil.getUserFromToken(jwt);
                                    final UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                                    UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                                    authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                                }
                            } catch (Exception e){
                                log.error("Cannot set user authentication: {}", e);
                            }
                            filterChain.doFilter(request, response);

                        }
    private String parseJwt(HttpServletRequest request){
        String headerAuth = request.getHeader("Authorization");
        if(headerAuth != null && headerAuth.startsWith("Bearer "))
            return headerAuth.substring(7);
        return null;
    }

}
