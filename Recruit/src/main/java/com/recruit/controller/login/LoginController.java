package com.recruit.controller.login;


import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

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
	
}
