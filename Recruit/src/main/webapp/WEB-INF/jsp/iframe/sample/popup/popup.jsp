<%@ page contentType="text/html; charset=UTF-8" language="java" %>

<div id="container">
    <div id="containerIn">
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

        <button onclick="restTest()">rest테스트</button>
        <button onclick="restPdfTest()">자기소개서 view</button>

		<div>
			팝업 return value
			<input type="text" id="inputValue1" name="inputValue1" />
			<input type="text" id="inputValue2" name="inputValue2" />
			<input type="text" id="inputValue3" name="inputValue3" />
		</div>	        
    </div>
</div>