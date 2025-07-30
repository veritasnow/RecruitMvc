package com.recruit.web.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.recruit.web.vo.user.UserVO;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class UserRequestDto {

    @NotNull(message  = "아이디는 필수입니다.")
    @NotBlank(message = "아이디는 공백일 수 없습니다.")
    private String id;
    
    @NotNull(message  = "이름은 필수입니다.")
    @NotBlank(message = "이름은 공백일 수 없습니다.")
    private String name;

    @NotNull(message  = "이메일은 필수입니다.")
    @NotBlank(message = "이메일은 공백일 수 없습니다.")
    private String email;
    
    @NotNull(message  = "휴대폰 번호는 필수입니다.")
    @NotBlank(message = "휴대폰 번호는 공백일 수 없습니다.")
    private String phone;

    @NotNull(message  = "생년월일은 필수입니다.")
    @NotBlank(message = "생년월일은 공백일 수 없습니다.")
    private String birth;
    
    @NotNull(message  = "비밀번호는 필수입니다.")
    @NotBlank(message = "비밀번호는 공백일 수 없습니다.")
    private String password;

    public UserVO toEntity() {
        return UserVO.builder()
        		     .id(id)
        		     .name(name)
        		     .email(email)
        		     .phone(phone)
        		     .birth(birth)
        		     .password(password)
        		     .build();
    }
}