const loginModule = {
    // 초기화 함수: 폼과 버튼 요소를 찾아 이벤트 바인딩 실행
    init: function() {
        this.form     = document.getElementById('loginForm'); // 로그인 폼 요소
        this.loginBtn = document.getElementById('loginBtn' ); // 로그인 버튼 요소

        this.bindEvents(); // 이벤트 등록
    },

    // 이벤트 등록 함수: 로그인 버튼 클릭 시 doLogin 함수 호출
    bindEvents: function() {
        this.loginBtn.addEventListener('click', () => {
            this.doLogin(this.form, 'doLogin'); // 'doLogin' URL로 폼 제출
        });
    },

    // 필수 입력값 공백 체크 함수
    hasBlank: function(formObj) {
        const checkList = ["text", "password", "textarea"]; // 검사할 input 타입 리스트
        for(let i = 0; i < formObj.length; i++) {
            const field = formObj[i];
            // 지정한 타입일 경우 공백 검사
            if(checkList.includes(field.type)) {
                if(field.value.trim() === "") {
                    // title 속성이 없으면 '필수 입력값'으로 대체
                    alert((field.title || '필수 입력값') + "이 누락되었습니다.");
                    field.focus(); // 공백 필드에 포커스 이동
                    return false;  // 공백 발견 시 false 반환
                }
            }
        }
        return true; // 공백 없으면 true 반환
    },

    // 로그인 처리 함수: 공백 검사 후 폼 제출
    doLogin: function(formObj, actionUrl) {
        if(this.hasBlank(formObj)) {
            formObj.action = actionUrl; // 폼 action URL 설정
            formObj.submit();           // 폼 제출
        }
    }
};

// DOM이 완전히 로드되면 LoginModule 초기화 실행
document.addEventListener('DOMContentLoaded', function() {
    loginModule.init();
});