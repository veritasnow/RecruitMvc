<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page contentType="text/html; charset=UTF-8" language="java" %>

<div id="container">
	<div id="containerIn">
	    <!-- 보안 유틸 스크립트 로드 -->
		<script src="/static/js/common/security.js" type="text/javascript"></script>	
		
	    <!-- 입력 영역 -->
	    <div>
	        <label>사용자 입력:</label>
	        <input type="text" id="userInput" placeholder="<script>alert('x')</script> 입력해보세요" />
	        <button onclick="handleInput()">검사하기</button>
	    </div>
	
	    <!-- 결과 출력 -->
	    <div style="margin-top: 15px;">
	        <strong>결과:</strong>
	        <pre id="outputBox"></pre>
	    </div>
	
	    <!-- 스크립트 예제 -->
	    <script type="text/javascript">
	        async function handleInput() {
	            const input = document.getElementById('userInput').value;
	            const outputEl = document.getElementById('outputBox');
	
	            // 1. 입력이 안전한지 검사
	            if (!securityUtil.isSafeInput(input)) {
	                alert('⚠️ 위험한 입력입니다. 스크립트나 이벤트 속성 등이 포함되어 있어요.');
	                securityUtil.safeTextInsert(outputEl, '🚫 위험 요소 포함됨. 출력 생략');
	                return;
	            }
	
	            // 2. 입력을 escape 처리하여 출력
	            const escaped = securityUtil.escapeHtml(input);
	            securityUtil.safeTextInsert(outputEl, '✅ escapeHtml 결과:\n' + escaped);
	
	            // 3. sanitize 처리도 함께 출력
	            const sanitized = securityUtil.sanitizeInput(input);
	            console.log('Sanitized:', sanitized);
	        }
	
	        // 운영 모드에서 콘솔 비활성화 예시
	        // securityUtil.blockConsole(); // 주석 해제 시 콘솔 비활성화됨
	    </script>
	
	</div>
</div>