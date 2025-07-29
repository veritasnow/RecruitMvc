package com.recruit.dto.user;

import java.io.Serializable;
import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import com.recruit.vo.user.UserVO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserAuthDto extends User implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String id;
	private String name;
	private int fromSocial;
	private UserVO userVo;

	public UserAuthDto(String username, String password, UserVO userVo, Collection<? extends GrantedAuthority> authorities) {
		super(username, password, authorities);
		this.id         = username;
		this.userVo     = userVo;
	}
}