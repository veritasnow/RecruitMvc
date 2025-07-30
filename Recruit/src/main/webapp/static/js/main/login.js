const loginModule = {
    /**
     * 모듈 초기화 함수
     * - 로그인 폼과 버튼 요소를 가져옴
     * - 이벤트 바인딩 실행
     */
    init: function() {
        this.form     = document.getElementById('loginForm'); // 로그인 폼 요소
        this.loginBtn = document.getElementById('loginBtn');  // 로그인 버튼 요소

        this.bindEvents(); // 로그인 버튼에 이벤트 등록
    },

    /**
     * 이벤트 등록 함수
     * - 로그인 버튼 클릭 시 doLogin 실행
     */
    bindEvents: function() {
        this.loginBtn.addEventListener('click', () => {
            this.doLogin(this.form, '/login'); // '/login' 경로로 로그인 시도
        });
    },

    /**
     * 필수 입력값(공백) 체크 함수
     * - input[type=text/password], textarea의 값을 확인
     * @param {HTMLFormElement} formObj - 검사할 폼 요소
     * @returns {boolean} 공백이 없으면 true, 있으면 false
     */
    hasBlank: function(formObj) {
        const checkList = ["text", "password", "textarea"]; // 검사할 input 타입

        for (let i = 0; i < formObj.length; i++) {
            const field = formObj[i];

            // 해당 타입의 필드만 검사
            if (checkList.includes(field.type)) {
                if (field.value.trim() === "") {
                    // 경고 메시지는 title 속성이 있으면 그것을 사용
                    alert((field.title || '필수 입력값') + "이 누락되었습니다.");
                    field.focus(); // 누락된 필드로 포커스 이동
                    return false;
                }
            }
        }

        return true; // 모든 필수 항목 입력 시 true 반환
    },

    /**
     * 로그인 수행 함수
     * - 필수 입력값 확인 후 폼 제출
     * @param {HTMLFormElement} formObj - 제출할 로그인 폼
     * @param {string} actionUrl - 로그인 요청을 보낼 서버 URL
     */
    doLogin: function(formObj, actionUrl) {
        if (this.hasBlank(formObj)) {
            formObj.action = actionUrl; // 로그인 처리 URL 설정
            formObj.submit();           // 폼 제출
        }
    }
};

// DOM 로드 완료 후 로그인 모듈 초기화
document.addEventListener('DOMContentLoaded', function() {
    loginModule.init();
});