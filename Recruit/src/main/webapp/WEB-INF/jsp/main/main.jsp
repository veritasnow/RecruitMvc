<%@ page contentType="text/html; charset=UTF-8" language="java" %>

<div id="container">
	<div id="containerIn">
	  <div id="sidebar">
	    <h5>📁 메뉴</h5>
	    <ul>
	      <%-- 필요 시 JSTL로 동적 메뉴 구성 가능 --%>
	    </ul>
	  </div>
	
	  <div id="main">
	    <div id="tab-bar">
	      <div id="scroll-left" title="왼쪽 스크롤">&lt;</div>
	      <div id="tabs" role="tablist"></div>
	      <div id="scroll-right" title="오른쪽 스크롤">&gt;</div>
	    </div>
	    <div id="iframe-container">
	    </div>
	  </div>
	
	  <!-- iframe 스크립트 -->
	  <script src="/static/js/iframe/iframeManager.js" type="text/javascript"></script>
	
	  <!-- main 스크립트 -->
	  <script src="/static/js/main/main.js" type="text/javascript"></script>
	</div>
</div>