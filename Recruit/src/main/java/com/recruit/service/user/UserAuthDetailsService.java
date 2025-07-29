package com.recruit.service.user;

import java.util.stream.Collectors;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.recruit.dto.user.UserAuthDto;
import com.recruit.vo.user.UserVO;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class UserAuthDetailsService implements UserDetailsService {
	
	private final UserService userService;

	public UserAuthDetailsService(UserService userService) {
		this.userService = userService;
	}
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		log.info("loadUser ByUserName : " + username);
		UserVO userVo = userService.findById(username);
		
		if(userVo == null) {
			throw new UsernameNotFoundException("사용자가 존재하지 않음");
		}

		
		log.info("----------------------------------");
		log.info(userVo.toString());
		System.out.println(userVo.toString());
		
		
		// false는 아직 미구현한 소셜 로그인
		UserAuthDto userAuthDTO = new UserAuthDto(
			userVo.getId(),
			userVo.getPassword(),
			userVo,
			userVo.getAuthList().stream().map(auth -> new SimpleGrantedAuthority(auth.getAuthority())).collect(Collectors.toSet())
		);
		userAuthDTO.setName(userVo.getNick());
		
		return userAuthDTO;
	}
}
