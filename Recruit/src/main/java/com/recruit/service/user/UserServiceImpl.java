package com.recruit.service.user;

import java.util.List;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.recruit.vo.auth.AuthVO;
import com.recruit.vo.user.UserVO;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class UserServiceImpl implements UserService {

	/*
	private final UserMapper mapper;

	public UserService(UserMapper mapper) {
		this.mapper = mapper;
	}
	*/	

	@Override
	public UserVO findById(String id) {
		
		
		log.info("------------------findById 접근------------------");
		
		// 1. 기능 구현해야함 아래는 샘플
		
		// 하드코딩된 샘플 사용자 데이터
		if ("test".equals(id)) {
			return UserVO.builder()
				.id("test")
				.email("testuser@example.com")
				.nick("테스트유저")
				.password(passwordEncoder("1234")) // {noop}은 Spring Security에서 평문을 의미
				.authList(List.of(
					AuthVO.builder().id("testuser").authority("ROLE_USER").build(),
					AuthVO.builder().id("testuser").authority("ROLE_ADMIN").build()
				))
				.build();
		}
		

	    // 사용자 없으면 예외 던지기
	    throw new UsernameNotFoundException("사용자를 찾을 수 없습니다: " + id);
	}
	
	

	
	// 스프링 암호화 사용할 경우
	private String passwordEncoder(String password) {
		PasswordEncoder passEncoder = new BCryptPasswordEncoder(); 
		return passEncoder.encode(password);
	}
}
