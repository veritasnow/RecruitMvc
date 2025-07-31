<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<div id="container">
  <div id="containerIn">
  
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



    <script>
      // 샘플 데이터
      const jsonData = [
        { id: '1', title: '사과' },
        { id: '2', title: '바나나' },
        { id: '3', title: '오렌지' }
      ];

      const selectElem = document.getElementById('mySelect');

      // Select 이벤트
      document.getElementById('btnSetSelect').addEventListener('click', () => {
        selectUtils.setSelect(selectElem, jsonData, 'title', 'id', undefined, '과일 선택');
      });

      document.getElementById('btnClear').addEventListener('click', () => {
        selectUtils.clearSelect(selectElem);
      });

      document.getElementById('btnAddOption').addEventListener('click', () => {
        selectUtils.addOption(selectElem, '수박', '4');
      });

      document.getElementById('btnSetDefault').addEventListener('click', () => {
        selectUtils.setDefaultValue(selectElem, '2');
      });

      document.getElementById('btnGetSelected').addEventListener('click', () => {
        const selectedValue = selectUtils.getSelectedValue(selectElem);
        alert('선택된 값: ' + selectedValue);
      });

      document.getElementById('btnGetAllOptions').addEventListener('click', () => {
        const options = selectUtils.getAllOptions(selectElem);
        console.log('전체 옵션:', options);
        alert('전체 옵션 개수: ' + options.length);
      });

      // 라디오 관련 코드
      const radioData = [
        { id: '1', label: '남자' },
        { id: '2', label: '여자' },
        { id: '3', label: '기타' }
      ];
      const radioContainer = document.getElementById('radioContainer');
      const radioName = 'gender';

      document.getElementById('btnSetRadio').addEventListener('click', () => {
        radioUtils.setRadioGroup(radioContainer, radioData, radioName, 'label', 'id', '1');
      });

      document.getElementById('btnGetRadio').addEventListener('click', () => {
        const selected = radioUtils.getSelectedValue(radioName);
        alert('선택된 성별: ' + (selected || '없음'));
      });

      document.getElementById('btnSetRadioValue').addEventListener('click', () => {
        radioUtils.setSelectedValue(radioName, '2');
      });

      // input 관련 코드
      const input = document.querySelector('#myInput');
      let isReadonly = false;
      let isDisabled = false;

      document.getElementById('btnInputSet').addEventListener('click', () => {
        inputUtils.setInput(input, { id: 'myInput', name: 'fruit', type: 'text', placeholder: '과일 입력', readonly: false });
        alert('Input 세팅 완료');
      });

      document.getElementById('btnInputGet').addEventListener('click', () => {
        const val = inputUtils.getValue(input);
        alert('Input 값: ' + val);
      });

      document.getElementById('btnInputSetValue').addEventListener('click', () => {
        inputUtils.setValue(input, '사과');
        alert('Input 값 "사과"로 세팅됨');
      });

      document.getElementById('btnInputToggleReadonly').addEventListener('click', () => {
        isReadonly = !isReadonly;
        inputUtils.setReadonly(input, isReadonly);
        alert('읽기전용 ' + (isReadonly ? '설정됨' : '해제됨'));
      });

      document.getElementById('btnInputToggleDisabled').addEventListener('click', () => {
        isDisabled = !isDisabled;
        inputUtils.setDisabled(input, isDisabled);
        alert('비활성화 ' + (isDisabled ? '설정됨' : '해제됨'));
      });
      
      
      
      
      
      
      // 기존 이벤트 바인딩 뒤에 추가
      const timerDisplayId = 'timerDisplay';

      document.getElementById('btnTimerStart').addEventListener('click', function() {
        timerUtil.start(timerDisplayId, 90, function() {
          alert('타이머 종료!');
        });
      });

      document.getElementById('btnTimerStop').addEventListener('click', function() {
        timerUtil.stop();
        const display = document.getElementById(timerDisplayId);
        if(display) display.textContent = '중지됨';
      });

      document.getElementById('btnTimerExtend').addEventListener('click', function() {
        timerUtil.extend(30);
        alert('타이머 30초 연장됨');
      });      
      
    </script>

  </div>
</div>