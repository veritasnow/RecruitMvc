<%@ page contentType="text/html; charset=UTF-8" language="java" %>

<div id="container">
    <div id="containerIn">
        <!-- JavaScript 파일 경로 (JSP에서는 EL로 contextPath 붙여줘야 함) -->
        <script type="text/javascript" src="/static/js/common/popup/popup.js"></script>
		
		팝업창 띄우기

        <script type="text/javascript">
            function restTest() {
                popupUtil.openPopupGet('/popup/popup-test', { id: 123, name: '홍길동' });
            }
            
            
			function restPdfTest() {
				popupUtil.openPopupGet('/pdf/popup', {});
			}
            
        </script>

        <button onclick="restTest()">
            rest테스트
        </button>
        
		<button onclick="restPdfTest()">
			자기소개서 view
		</button>	        
        
        
    </div>
</div>