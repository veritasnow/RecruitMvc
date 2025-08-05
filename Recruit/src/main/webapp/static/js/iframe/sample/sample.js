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
// 1) 서버에서 데이터만 받아오는 함수 (Promise 반환)
  getBoardList: function () {
    return restApi.read('/sample/board/list', {})
      .catch(function (error) {
        console.error('API 요청 실패:', error);
        throw error; // 호출한 쪽에서 추가 처리 가능하도록 에러 던짐
      });
  },

  // 2) 받은 데이터로 UI 세팅하는 함수 (파라미터는 JSON 데이터)
  setUi: function(posts) {
    const cleanPosts = this.sanitizePosts(posts);
    const boardBody = document.getElementById("boardBody");

    const html = cleanPosts.map(post => `
      <tr>
        <td>${post.id}</td>
        <td><a href="#">${post.title}</a></td>
        <td>${post.author}</td>
        <td>${post.date}</td>
      </tr>
    `).join('');

    boardBody.innerHTML = html;
  },

  // 3) getBoardList 호출 후 setUi 실행 (초기화 또는 버튼 이벤트에 사용)
  init: function () {
    this.getBoardList()
      .then(data => this.setUi(data))
      .catch(error => {
        // 에러 처리, 필요시 UI 표시 등
        alert('게시판 데이터를 불러오는 데 실패했습니다.');
      });
  },
  
  // 4) getBoardList 호출 후 xss 제거
  sanitizePosts: function(posts) {
    function removeScriptTags(str) {
      if (!str) return '';
      return str.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    }

    return posts.map(post => ({
      id    : String(post.id),
      title : DOMPurify.sanitize(removeScriptTags(post.title)),
      author: DOMPurify.sanitize(removeScriptTags(post.author)),
      date  : DOMPurify.sanitize(removeScriptTags(post.date))
    }));
  },  
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