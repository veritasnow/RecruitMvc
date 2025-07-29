package com.recruit.service.user;

import com.recruit.vo.user.UserVO;

public interface UserService {
    UserVO findById(String id);
}