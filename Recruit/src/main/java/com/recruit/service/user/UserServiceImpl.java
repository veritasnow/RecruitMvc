package com.recruit.service.user;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.recruit.dto.UserRequestDto;
import com.recruit.dto.UserResponseDto;
import com.recruit.mapper.UserMapper;
import com.recruit.vo.auth.AuthVO;
import com.recruit.vo.user.UserVO;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class UserServiceImpl implements UserService {
	
	/**
     * User Mapper Field
     */
    @Resource(name = "userMapper")
    private UserMapper userMapper;

	@Override
	public UserVO findById(String id) throws Exception {
		log.info("------------------findById 접근------------------");
		
		// 1. 기능 구현해야함 아래는 샘플
		UserRequestDto userRequestDto = new UserRequestDto();
		userRequestDto.setId(id);
		
		UserResponseDto userResponseDto = userMapper.selectUser(userRequestDto.toEntity());
		
		if (userResponseDto != null) {
			userResponseDto.setAuthList(List.of(
					AuthVO.builder().id("test").authority("ROLE_USER").build(),
					AuthVO.builder().id("test").authority("ROLE_ADMIN").build()
					));
			
			return userResponseDto.toEntity();
		}

	    // 사용자 없으면 예외 던지기
	    throw new UsernameNotFoundException("사용자를 찾을 수 없습니다: " + id);
	}
	
	@Override
	public boolean insertUser(UserRequestDto userRequestDto) throws Exception {
		log.info("------------------insertUser------------------");
		
		String password = userRequestDto.getPassword();
		password = passwordEncoder(password);
		
		userRequestDto.setPassword(password);
		
		int result = userMapper.insertUser(userRequestDto.toEntity());
		
		if (result == 0) {
			return false;
		}
		
	    return true;
	}
	
	@Override
	public boolean updateUser(UserRequestDto userRequestDto) throws Exception {
		log.info("------------------updateUser------------------");
		
		int result = userMapper.updateUser(userRequestDto.toEntity());
		
		if (result == 0) {
			return false;
		}
		
		return true;
	}
	
	@Override
	public boolean deleteUser(UserRequestDto userRequestDto) throws Exception {
		log.info("------------------deleteUser------------------");
		
		int result = userMapper.deleteUser(userRequestDto.toEntity());
		
		if (result == 0) {
			return false;
		}
		
		return true;
	}
	
	// 스프링 암호화 사용할 경우
	private String passwordEncoder(String password) {
		PasswordEncoder passEncoder = new BCryptPasswordEncoder(); 
		return passEncoder.encode(password);
	}
}
