<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>


<header id="header">
	<div id="headerin">
	    <h1 class="logo">
	    	<a href="/">logo</a>
	    </h1> <!-- .logo -->
	
	    <div class="loginAndCreate">
	        <ul>
	            <!-- 로그인한 사용자 닉네임 출력 -->
	            <sec:authorize access="isAuthenticated()">
	                <li class="nick">
                        <sec:authentication property="principal.userVO.name" />
	                </li>
	            </sec:authorize>
	
	            <!-- 로그인 링크 (비인증 사용자만) -->
	            <sec:authorize access="!isAuthenticated()">
	                <li><a href="/login">로그인</a></li>
	            </sec:authorize>
	
	            <!-- 로그아웃 링크 (인증 사용자만) -->
	            <sec:authorize access="isAuthenticated()">
	                <li><a href="/logout">로그아웃</a></li>
	            </sec:authorize>
	        </ul>
	    </div>
	</div> <!-- #headerin -->
</header>
