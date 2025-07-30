package com.recruit.web.controller.login;


import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import com.recruit.router.Route;
import com.recruit.router.Router;
import com.recruit.router.ViewConstants;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class LoginController {

	@GetMapping("/login")
	public String login(Model model) {
		log.info("--------------- loginPage --------------");
		Route route = Router.getInstance().getRoute("login");
		model.addAttribute("route", route);
		return ViewConstants.INDEX;		
	}
	
	
	@PostMapping("/loginFailed")
	public String loginFailed(Model model) {
		log.info("--------------- 로그인 실패 --------------");
		Route route = Router.getInstance().getRoute("login");
		model.addAttribute("route", route);
		return ViewConstants.INDEX;		
	}	
}
