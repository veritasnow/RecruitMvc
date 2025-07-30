package com.recruit.web.controller;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.recruit.router.Route;
import com.recruit.router.Router;
import com.recruit.router.ViewConstants;
import com.recruit.web.dto.SampleRequestDto;
import com.recruit.web.dto.SampleResonseDto;

@RequestMapping("/sample")
@Controller
public class SampleController {

	@GetMapping("/page")
	public String page(Model model) {
		Route  route  = Router.getInstance().getRoute("sample");
		model.addAttribute("route", route);
		return ViewConstants.IFRAME_INDEX;
	}	
	
	
	
	
	
	@GetMapping("/test")
	public String sample(Model model) {

		System.out.println("테스트..!!");
		
		Route  route  = Router.getInstance().getRoute("main");
		model.addAttribute("route", route);
		
		System.out.println("ViewConstants.INDEX : " + ViewConstants.INDEX);
		System.out.println("route : " + route.toString());
		
		
		return ViewConstants.INDEX;
	}
	
	
	
	// REST용 JSON 반환 메서드 추가
	@GetMapping("/test2")
	@ResponseBody
	public ResponseEntity<?> restTest(@Valid SampleRequestDto sampleRequestDto, BindingResult bindingResult) {
	    if (bindingResult.hasErrors()) {
	        // 간단하게 첫 에러 메시지 리턴
	        String errorMessage = bindingResult.getAllErrors().get(0).getDefaultMessage();
	        return ResponseEntity.badRequest().body(errorMessage);
	    }

	    System.out.println("REST 테스트..!!");
	    System.out.println(sampleRequestDto.toString());

	    SampleResonseDto test = new SampleResonseDto();
	    test.setId("1111");
	    test.setName("테스트");

	    return new ResponseEntity<>(test, HttpStatus.OK);
	}
}
