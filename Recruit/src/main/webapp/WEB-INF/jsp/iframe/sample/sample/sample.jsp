<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<div id="container">
	<div id="containerIn">
	
		<h3>✅ Select 박스 예제</h3>
		<select id="mySelect"></select><br>
		
		<button id="btnSetSelect">데이터 세팅</button>
		<button id="btnClear">초기화</button>
		<button id="btnAddOption">옵션 추가</button>
		<button id="btnSetDefault">기본값 설정 (value=2)</button>
		<button id="btnGetSelected">선택값 가져오기</button>
		<button id="btnGetAllOptions">전체 옵션 출력</button>
		
		<hr>
		
		<h3>✅ 라디오 버튼 예제</h3>
		<div id="radioContainer"></div>
		
		<button id="btnSetRadio">라디오 세팅</button>
		<button id="btnGetRadio">선택된 라디오 값</button>
		<button id="btnSetRadioValue">기본값 선택 (value=2)</button>
		
		<script>
		  // 샘플 데이터
		  const jsonData = [
		    { id: '1', title: '사과' },
		    { id: '2', title: '바나나' },
		    { id: '3', title: '오렌지' }
		  ];
		
		  const selectElem = document.getElementById('mySelect');
		
		  // 1. 데이터 밀어넣기 + placeholder
		  document.getElementById('btnSetSelect').addEventListener('click', () => {
		    selectUtils.setSelect(selectElem, jsonData, 'title', 'id', undefined, '과일 선택');
		  });
		
		  // 2. 옵션 전체 초기화
		  document.getElementById('btnClear').addEventListener('click', () => {
		    selectUtils.clearSelect(selectElem);
		  });
		
		  // 3. 옵션 1개 추가
		  document.getElementById('btnAddOption').addEventListener('click', () => {
		    selectUtils.addOption(selectElem, '수박', '4');
		  });
		
		  // 4. 기본값 설정 (value=2인 옵션 선택)
		  document.getElementById('btnSetDefault').addEventListener('click', () => {
		    selectUtils.setDefaultValue(selectElem, '2');
		  });
		
		  // 5. 선택된 값 가져오기
		  document.getElementById('btnGetSelected').addEventListener('click', () => {
		    const selectedValue = selectUtils.getSelectedValue(selectElem);
		    alert('선택된 값: ' + selectedValue);
		  });
		
		  // 6. 전체 옵션 배열 가져오기 및 출력
		  document.getElementById('btnGetAllOptions').addEventListener('click', () => {
		    const options = selectUtils.getAllOptions(selectElem);
		    console.log('전체 옵션:', options);
		    alert('전체 옵션 개수: ' + options.length);
		  });
		
		  // ▶ 라디오 관련 코드
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
		</script>
	
	</div>


</div>