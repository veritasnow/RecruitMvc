package com.recruit.web.controller.error;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.recruit.router.Router;
import com.recruit.router.ViewConstants;

import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
public class CustomErrorController {

    private final Router router = Router.getInstance();

    @RequestMapping("/error/403")
    public String handle403(HttpServletRequest request, Model model) {
        log.info("403 Forbidden error 발생! 요청 URI: {}", request.getRequestURI());
        model.addAttribute("route", router.getRoute("forbidden"));
        return ViewConstants.INDEX;
    }

    @RequestMapping("/error/404")
    public String handle404(HttpServletRequest request, Model model) {
        log.info("404 Not Found error 발생! 요청 URI: {}", request.getRequestURI());
        model.addAttribute("route", router.getRoute("notFoundPage"));
        return ViewConstants.INDEX;
    }

    @RequestMapping("/error/405")
    public String handle405(HttpServletRequest request, Model model) {
        log.info("405 Method Not Allowed error 발생! 요청 URI: {}", request.getRequestURI());
        model.addAttribute("route", router.getRoute("methodNotAllowed"));
        return ViewConstants.INDEX;
    }

    @RequestMapping("/error/500")
    public String handle500(HttpServletRequest request, Model model) {
        log.info("500 Internal Server Error 발생! 요청 URI: {}", request.getRequestURI());
        model.addAttribute("route", router.getRoute("serverError"));
        return ViewConstants.INDEX;
    }

    @RequestMapping("/error/exception")
    public String handleException(HttpServletRequest request, Model model) {
        log.info("Exception 발생! 요청 URI: {}", request.getRequestURI());
        model.addAttribute("route", router.getRoute("generalError"));
        return ViewConstants.INDEX;
    }
}