package com.recruit.web.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

// TODO 기능이 필요하면 구현할 것.. 필요 없으면 운영반영 전에 제거할 것
@Component
public class RecruitInterceptor implements HandlerInterceptor {
	
	// 컨트롤러 진입전
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		return true;
    }

    // 컨트롤러 진입 후 view렌더링 전
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
    }

    // 컨트롤러 진입 후 view 렌더링 후
    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object object, Exception arg3) throws Exception {
    }
}
