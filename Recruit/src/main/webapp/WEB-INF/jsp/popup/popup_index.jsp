<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">

<script type="text/javascript" src="/static/js/common/popup/popup.js"></script>

<title>팝업 테스트</title>

</head>

<body>
<div id="wrap">

	테스트..!!!

	<input type="text" id="inputValue1" value="테스트 값 1">
	<input type="text" id="inputValue2" value="테스트 값 2">
	<input type="text" id="inputValue3" value="테스트 값 3">

	<!-- 여러 id 배열로 넘김 -->
	<button onclick="popupUtil.returnToParent({ elementId: ['inputValue1', 'inputValue2', 'inputValue3'] })">
		부모창에 여러 값 전송
	</button>
</div>
</body>
</html>