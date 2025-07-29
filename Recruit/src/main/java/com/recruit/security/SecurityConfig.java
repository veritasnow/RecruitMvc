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

        http
            .addFilterBefore(cspHeaderFilter, BasicAuthenticationFilter.class)
            .addFilterBefore(xssFilter, BasicAuthenticationFilter.class)
            .addFilterBefore(sqlInjectionFilter, BasicAuthenticationFilter.class)
            .authorizeHttpRequests(auth -> auth.anyRequest().permitAll());

        http.headers().frameOptions().sameOrigin(); // iframe 허용 설정

        // 로그인 및 로그아웃 설정 비활성화된 부분은 주석 처리로 유지
        /*
        http.formLogin(form -> form
            .loginPage("/login")
            .loginProcessingUrl("/doLogin")
            .usernameParameter("id")
            .passwordParameter("password")
            .defaultSuccessUrl("/main", true)
            .failureForwardUrl("/loginFailed")
        );

        http.logout(logout -> logout
            .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
            .invalidateHttpSession(true)
            .deleteCookies("JSESSIONID")
            .logoutSuccessUrl("/main")
        );

        http.authorizeHttpRequests(auth -> auth
            .antMatchers("/user/login").permitAll()
            .antMatchers("/user/join").permitAll()
            .antMatchers("/admin/**").hasRole("ADMIN")
        );
        */

        log.info("------------------------Security Configure End---------------------------");

        return http.build();
    }
}