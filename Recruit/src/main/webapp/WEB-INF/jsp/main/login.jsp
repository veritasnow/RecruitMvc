<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<div id="container">
	<div id="loginContainer">
	    <div class="loginContainerIn">
	        <h1 class="loginLogo">1</h1>
	        <div class="inforBox">
	            <h2>로그인</h2>
	        </div>
			<form method="post" id="loginForm">
			    <!-- CSRF 토큰 수동 삽입 -->
			    <c:if test="${not empty _csrf}">
			        <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
			    </c:if>
			    
			    <input type="text" class="id" id="id" name="id" placeholder="아이디" autocomplete="username" />
			    <input type="password" class="password" id="password" name="password" placeholder="비밀번호" autocomplete="current-password" />
			    
			    <div class="find">
			        <ul>
			            <li><a href="#">아이디 찾기</a></li>
			            <li><a href="#">비밀번호 찾기</a></li>
			        </ul>
			    </div>
			    
			    <button type="button" class="loginBtn" id="loginBtn">로그인</button>
			</form>
	        <p class="copyright">© 2025 <span>MG데이터시스템</span></p>
	    </div>
	</div>
	
	<script type="text/javascript">
	    $('#container').css('padding-top', '0px');
	</script>
	
	<!-- main 스크립트 -->
	<script src="/static/js/main/login.js" type="text/javascript"></script>	
</div>