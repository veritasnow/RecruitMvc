package com.recruit.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import com.recruit.security.filter.CspHeaderFilter;
import com.recruit.security.filter.SqlInjectionFilter;
import com.recruit.security.filter.XssFilter;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private CspHeaderFilter cspHeaderFilter;

    @Autowired
    private XssFilter xssFilter;

    @Autowired
    private SqlInjectionFilter sqlInjectionFilter;

    /**
     * 비밀번호 암호화 빈 등록
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * Spring Security FilterChain 설정 (Spring Security 5.7+)
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        log.info("------------------------Security Configure Start---------------------------");

        // 커스텀 필터 등록
        http
            .addFilterBefore(cspHeaderFilter, BasicAuthenticationFilter.class)
            .addFilterBefore(xssFilter, BasicAuthenticationFilter.class)
            .addFilterBefore(sqlInjectionFilter, BasicAuthenticationFilter.class);

        // iframe 허용 설정
        http.headers().frameOptions().sameOrigin();

        // 로그인 설정
        http.formLogin(form -> form
            .loginPage("/login")
            .loginProcessingUrl("/login")
            .usernameParameter("id")
            .passwordParameter("password")
            .defaultSuccessUrl("/main", true)
            .failureForwardUrl("/loginFailed")
        );

        // 권한 설정
        http.authorizeHttpRequests(auth -> auth
            .requestMatchers(
                new AntPathRequestMatcher("/login"),
                new AntPathRequestMatcher("/static/**")      // 정적 리소스 허용
            ).permitAll()
            .requestMatchers(new AntPathRequestMatcher("/main")).hasRole("USER") // USER 권한 가진 경우만
            .anyRequest().authenticated() // 인증만 되면 접근 가능
        );
        
        // 로그아웃 설정
        http.logout(logout -> logout
            .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
            .logoutSuccessUrl("/login")               // 로그아웃 후 이동할 URL
            .invalidateHttpSession(true)              // ✅ 세션 무효화
            .deleteCookies("JSESSIONID")              // ✅ JSESSIONID 쿠키 삭제
            .clearAuthentication(true)                // ✅ SecurityContext에서 인증 정보 제거
        );

        log.info("------------------------Security Configure End---------------------------");
        return http.build();
    }
}