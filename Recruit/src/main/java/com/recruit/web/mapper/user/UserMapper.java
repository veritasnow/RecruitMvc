package com.recruit.web.mapper.user;

import org.egovframe.rte.psl.dataaccess.mapper.Mapper;

import com.recruit.web.dto.UserResponseDto;
import com.recruit.web.vo.user.UserVO;

@Mapper("userMapper")
public interface UserMapper {
	public UserResponseDto selectUser(UserVO userVO) throws Exception;
	
	public int insertUser(UserVO userVO) throws Exception;
	
	public int updateUser(UserVO userVO) throws Exception;
	
	public int deleteUser(UserVO userVO) throws Exception;
}
