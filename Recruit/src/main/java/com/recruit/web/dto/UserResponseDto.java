package com.recruit.web.dto;

import java.util.List;

import com.recruit.web.vo.auth.AuthVO;
import com.recruit.web.vo.user.UserVO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserResponseDto {
    private String id;
    private String name;
    private String email;
    private String phone;
    private String birth;
    private String password;
	private List<AuthVO> authList;
    
    
    public UserVO toEntity() {
        return UserVO.builder()
        		     .id(id)
        		     .name(name)
        		     .email(email)
        		     .phone(phone)
        		     .birth(birth)
        		     .password(password)
        		     .authList(authList)
        		     .build();
    }    
}

