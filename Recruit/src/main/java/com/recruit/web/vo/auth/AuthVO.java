package com.recruit.web.vo.auth;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;



@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthVO implements Serializable {
	
    private static final long serialVersionUID = 1L;
    
	private String id;
	private String authority;
}
