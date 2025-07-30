package com.recruit.web.service.user;

import com.recruit.web.dto.UserRequestDto;
import com.recruit.web.vo.user.UserVO;

public interface UserService {
    UserVO findById(String id) throws Exception;
    
    boolean insertUser(UserRequestDto userRequestDto) throws Exception;
    
    boolean updateUser(UserRequestDto userRequestDto) throws Exception;
    
    boolean deleteUser(UserRequestDto userRequestDto) throws Exception;
}