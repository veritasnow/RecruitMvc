package com.recruit.vo.user;

import java.io.Serializable;
import java.util.List;

import com.recruit.vo.auth.AuthVO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class UserVO implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private String id;
	private String name;
	private String email;
	private String phone;
	private String birth;
	private String password;
	private List<AuthVO> authList;
}