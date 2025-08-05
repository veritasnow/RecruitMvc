// ✅ Select 모듈
const selectModule = {
  init: function () {
    const selectElem = document.getElementById('mySelect');
    const jsonData = [
      { id: '1', title: '사과' },
      { id: '2', title: '바나나' },
      { id: '3', title: '오렌지' }
    ];

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
  }
};

// ✅ Radio 모듈
const radioModule = {
  init: function () {
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
  }
};

// ✅ Input 모듈
const inputModule = {
  init: function () {
    const input = document.querySelector('#myInput');
    let isReadonly = false;
    let isDisabled = false;

    document.getElementById('btnInputSet').addEventListener('click', () => {
      inputUtils.setInput(input, {
        id: 'myInput',
        name: 'fruit',
        type: 'text',
        placeholder: '과일 입력',
        readonly: false
      });
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
  }
};

// ✅ Timer 모듈
const timerModule = {
  init: function () {
    const timerDisplayId = 'timerDisplay';

    document.getElementById('btnTimerStart').addEventListener('click', function () {
      timerUtil.start(timerDisplayId, 90, function () {
        alert('타이머 종료!');
      });
    });

    document.getElementById('btnTimerStop').addEventListener('click', function () {
      timerUtil.stop();
      const display = document.getElementById(timerDisplayId);
      if (display) display.textContent = '중지됨';
    });

    document.getElementById('btnTimerExtend').addEventListener('click', function () {
      timerUtil.extend(30);
      alert('타이머 30초 연장됨');
    });
  }
};

// ✅ 공유 모듈
const shareInitModule = {
  init: function () {
    shareModule.init('btnShare', 'shareModal', 'btnCloseModal', 'shareButtons');
    shareModule.setShareData(
      'https://recruit.kfcc.co.kr/inco/hopeZoneGmgo.do',
      'KFCC 채용공고',
      '함께 꿈을 이루세요!'
    );
  }
};

// ✅ 게시판 모듈
const boardModule = {
  init: function () {
    const posts = [
      { id: 1, title: '공지사항입니다', author: '관리자', date: '2025-08-04' },
      { id: 2, title: '자주 묻는 질문', author: '홍길동', date: '2025-08-03' },
      { id: 3, title: '사이트 이용 안내', author: '김영희', date: '2025-08-01' }
    ];

    const boardBody = document.getElementById("boardBody");

    const html = posts.map(post => `
      <tr>
        <td>${post.id}</td>
        <td><a href="#">${post.title}</a></td>
        <td>${post.author}</td>
        <td>${post.date}</td>
      </tr>
    `).join('');

    boardBody.innerHTML = html;
  }
};



// 페이지 로딩 시 각 모듈 초기화
document.addEventListener('DOMContentLoaded', function () {
  selectModule.init();
  radioModule.init();
  inputModule.init();
  timerModule.init();
  shareInitModule.init();
  boardModule.init();
});