package com.recruit.web.service.user;

import java.util.stream.Collectors;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.recruit.web.dto.user.UserAuthDto;
import com.recruit.web.vo.user.UserVO;

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
		
		try {
			UserVO userVo = userService.findById(username);
			UserAuthDto userAuthDTO = new UserAuthDto(
				userVo.getId(),
				userVo.getPassword(),
				userVo,
				userVo.getAuthList().stream().map(auth -> new SimpleGrantedAuthority(auth.getAuthority())).collect(Collectors.toSet())
			);
			userAuthDTO.setName(userVo.getName());
			
			return userAuthDTO;
		} catch (Exception e) {
			throw new UsernameNotFoundException("사용자가 존재하지 않음");
		}
	}
}
