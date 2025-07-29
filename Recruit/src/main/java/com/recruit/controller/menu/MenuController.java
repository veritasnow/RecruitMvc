package com.recruit.controller.menu;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.recruit.dto.menu.MenuListRequestDto;
import com.recruit.dto.menu.MenuListResponseDto;

import lombok.extern.slf4j.Slf4j;


@Slf4j
@Controller
@RequestMapping("/menu")
public class MenuController {

	// REST용 JSON 반환 메서드 추가
	@GetMapping(value = "/list", produces = "application/json")
	@ResponseBody
	public ResponseEntity<?> restTest(@Valid MenuListRequestDto menuListRequestDto, BindingResult bindingResult) {
		log.info("------------------------------------메뉴리스트 조회--------------------------------");
		
	    if (bindingResult.hasErrors()) {
	        // 간단하게 첫 에러 메시지 리턴
	        String errorMessage = bindingResult.getAllErrors().get(0).getDefaultMessage();
	        return ResponseEntity.badRequest().body(errorMessage);
	    }

	    System.out.println("REST 메뉴 테스트..!!");
	    System.out.println(menuListRequestDto.toString());
	    
	    // 1. 리스트 생성
	    List<MenuListResponseDto> result = new ArrayList<>();

	    // 2. 항목 추가
	    result.add(new MenuListResponseDto("validSample"    , "유효성검증 샘플", "validation/sample"));
	    result.add(new MenuListResponseDto("popupSample"    , "팝업/PDF샘플" , "popup/sample"));
	    result.add(new MenuListResponseDto("fileSample"     , "파일 샘플"    , "file/sample"));
	    result.add(new MenuListResponseDto("securitySample" , "보안 샘플"    , "security/sample"));
	    
	    return new ResponseEntity<>(result, HttpStatus.OK);
	}
		
	// REST용 JSON 반환 메서드 추가
	@PostMapping(value = "/list", produces = "application/json")
	@ResponseBody
	public ResponseEntity<?> postTest(@RequestBody @Valid MenuListRequestDto menuListRequestDto, BindingResult bindingResult) {
	    if (bindingResult.hasErrors()) {
	        // 간단하게 첫 에러 메시지 리턴
	        String errorMessage = bindingResult.getAllErrors().get(0).getDefaultMessage();
	        return ResponseEntity.badRequest().body(errorMessage);
	    }

	    System.out.println("냠냠테스트 메뉴 테스트..!!");
	    System.out.println(menuListRequestDto.toString());
	    
	    // 1. 리스트 생성
	    List<MenuListResponseDto> result = new ArrayList<>();

	    // 2. 항목 추가
	    result.add(new MenuListResponseDto("validSample", "유효성검증 샘플", "validation/sample"));
	    result.add(new MenuListResponseDto("sample2", "샘플2", "sample/page2"));
	    result.add(new MenuListResponseDto("sample3", "샘플3", "sample/page3"));
	    
	    

	    return new ResponseEntity<>(result, HttpStatus.OK);
	}		
	
	
	
	// REST용 JSON 반환 메서드 추가
	@PutMapping(value = "/list", produces = "application/json")
	@ResponseBody
	public ResponseEntity<?> putTest(@RequestBody @Valid MenuListRequestDto menuListRequestDto, BindingResult bindingResult) {
	    if (bindingResult.hasErrors()) {
	        // 간단하게 첫 에러 메시지 리턴
	        String errorMessage = bindingResult.getAllErrors().get(0).getDefaultMessage();
	        return ResponseEntity.badRequest().body(errorMessage);
	    }

	    System.out.println("냠냠테스트 메뉴 테스트..123123123!!");
	    System.out.println(menuListRequestDto.toString());
	    
	    // 1. 리스트 생성
	    List<MenuListResponseDto> result = new ArrayList<>();

	    // 2. 항목 추가
	    result.add(new MenuListResponseDto("validSample", "유효성검증 샘플", "validation/sample"));
	    result.add(new MenuListResponseDto("sample2", "샘플2", "sample/page2"));
	    result.add(new MenuListResponseDto("sample3", "샘플3", "sample/page3"));

	    return new ResponseEntity<>(result, HttpStatus.OK);
	}	
	
	
}