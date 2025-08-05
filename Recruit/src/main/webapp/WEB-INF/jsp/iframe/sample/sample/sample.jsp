<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<div id="container">
  <div id="containerIn">
	<script src="/static/js/iframe/sample/sample.js" type="text/javascript"></script>
  
	<section>
	    <h3>✅ Select 박스 예제</h3>
	    <select id="mySelect"></select><br>
		<ul>
			<li>
				<button id="btnSetSelect">데이터 세팅</button>
			</li>
			<li>
				<button id="btnClear">초기화</button>
			</li>
			<li>
				<button id="btnAddOption">옵션 추가</button>
			</li>
			<li>
				<button id="btnSetDefault">기본값 설정 (value=2)</button>
			</li>
			<li>
				<button id="btnGetSelected">선택값 가져오기</button>
			</li>
			<li>
				<button id="btnGetAllOptions">전체 옵션 출력</button>
			</li>			
		</ul>    
	</section>
    
	<br/>
    <hr/>

    
    <h3>✅ 라디오 버튼 예제</h3>
    <div id="radioContainer"></div>
    
    <button id="btnSetRadio">라디오 세팅</button>
    <button id="btnGetRadio">선택된 라디오 값</button>
    <button id="btnSetRadioValue">기본값 선택 (value=2)</button>

	<br/>
    <hr/>

    <h3>✅ Input 예제</h3>
    <input id="myInput" /><br><br>

    <button id="btnInputSet">Input 세팅</button>
    <button id="btnInputGet">값 가져오기</button>
    <button id="btnInputSetValue">값 세팅 (사과)</button>
    <button id="btnInputToggleReadonly">읽기전용 토글</button>
    <button id="btnInputToggleDisabled">비활성화 토글</button>

    <br/>
    <hr/>


    <!-- 타이머 관련 섹션 추가 -->
    <!-- 기존 스크립트 태그 아래에 timer.js 추가 -->
    <script src="/static/js/common/timer.js" type="text/javascript"></script>    
    <section>
      <h3>⏱ 타이머 예제</h3>
      <div id="timerDisplay" style="font-size:24px; font-weight:bold; margin-bottom:10px;">00:00</div>
      <button id="btnTimerStart">타이머 시작 (90초)</button>
      <button id="btnTimerStop">타이머 정지</button>
      <button id="btnTimerExtend">타이머 30초 연장</button>
    </section>

    <br/>
    <hr/>
    
    
    
	<!-- 공유하기 버튼 -->
	<button id="btnShare">공유하기</button>
    <!-- 기존 스크립트 태그 아래에 timer.js 추가 -->
    <script src="/static/js/common/social/shareUtils.js" type="text/javascript"></script>    

	<!-- 공유하기 모달 (숨겨져 있음) -->
	<div id="shareModal" style="display:none; position:fixed; top:20%; left:50%; transform:translateX(-50%); background:#fff; border:1px solid #ccc; padding:20px; box-shadow:0 2px 10px rgba(0,0,0,0.2); z-index:1000;">
	    <h3>공유하기</h3>
	    <div id="shareButtons" style="display:flex; gap:10px;">
	        <!-- 버튼들 여기에 생성 -->
	    </div>
	    <button id="btnCloseModal" style="margin-top:10px;">닫기</button>
	</div>
    
    
    
    <!-- 리터럴 탬플릿 예시 -->
	<h2>📋 게시판 (템플릿 리터럴 방식)</h2>
	<table>
	  <thead>
	    <tr>
	      <th>번호</th>
	      <th>제목</th>
	      <th>작성자</th>
	      <th>작성일</th>
	    </tr>
	  </thead>
	  <tbody id="boardBody"></tbody>
	</table>    
	 

  </div>
</div>