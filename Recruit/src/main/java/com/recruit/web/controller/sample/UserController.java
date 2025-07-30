package com.recruit.web.controller.sample;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.recruit.web.dto.UserRequestDto;
import com.recruit.web.service.user.UserService;

@Controller
@RequestMapping("/user")
public class UserController {
    
    private final UserService userService;

	public UserController(UserService userService) {
		this.userService = userService;
	}
    
	/**
     * 유저 등록
     */
    @PostMapping("/test")
    @ResponseBody
    public ResponseEntity<?> insert(@RequestBody UserRequestDto userRequestDto) throws Exception {
        boolean result = userService.insertUser(userRequestDto);
        
        Map<String, Object> response = new HashMap<>();
        
        if (!result) {
        	response.put("status" , "error");
			response.put("message", "유저 등록 실패");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
        
        response.put("status" , "success");
		response.put("message", "유저 등록 성공");
        
        return ResponseEntity.ok(response);
    }
    
    /**
     * 유저 수정
     */
    @PutMapping("/test")
    @ResponseBody
    public ResponseEntity<?> update(@RequestBody UserRequestDto userRequestDto) throws Exception {
    	boolean result = userService.updateUser(userRequestDto);
    	
    	Map<String, Object> response = new HashMap<>();
        
        if (!result) {
        	response.put("status" , "error");
			response.put("message", "유저 등록 실패");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
        
        response.put("status" , "success");
		response.put("message", "유저 등록 성공");
        
        return ResponseEntity.ok(response);
    }
    
    /**
     * 유저 삭제
     */
    @DeleteMapping("/test")
    @ResponseBody
    public ResponseEntity<?> delete(@RequestBody UserRequestDto userRequestDto) throws Exception {
    	boolean result = userService.deleteUser(userRequestDto);
    	
    	Map<String, Object> response = new HashMap<>();
        
        if (!result) {
        	response.put("status" , "error");
			response.put("message", "유저 등록 실패");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
        
        response.put("status" , "success");
		response.put("message", "유저 등록 성공");
        
        return ResponseEntity.ok(response);
    }
}
