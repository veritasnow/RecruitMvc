const main = {
    // 사이드바 메뉴를 담을 DOM 요소
    menuList: null,

    /**
     * 초기화 함수
     * - 사이드바 메뉴 영역 요소를 찾고
     * - 메뉴 데이터를 불러옴
     */
    init: function () {
        this.menuList = document.querySelector('#sidebar ul'); // 사이드바의 <ul> 요소 선택
        this.loadMenu(); // 서버에서 메뉴 데이터 불러오기
    },

    /**
     * 메뉴 데이터 API 호출
     * - restApi.read를 사용해 '/menu/list' 엔드포인트에서 데이터 요청
     * - 성공 시 renderMenu 호출, 실패 시 에러 출력
     */
    loadMenu: function () {
        const self = this;

        restApi.read('/menu/list', { id: 1 }) // 예시용 요청 파라미터: id=1
            .then(function (data) {
                self.renderMenu(data); // 받은 메뉴 데이터를 렌더링
            })
            .catch(function (error) {
                console.error('API 요청 실패:', error); // 에러 처리
            });
    },

    /**
     * 메뉴 HTML 렌더링 함수
     * - 받아온 데이터를 기반으로 <li> 항목 생성
     * @param {Array} data - 서버에서 받아온 메뉴 리스트
     */
    renderMenu: function (data) {
        let html = '';

        for (let i = 0; i < data.length; i++) {
            const menu = data[i];

            // 각 메뉴 항목에 data-url, data-title 속성 설정
            html += '<li data-url="' + menu.url + '" data-title="' + menu.name + '">' + menu.name + '</li>';
        }

        this.menuList.innerHTML = html; // <ul>에 렌더링된 메뉴 삽입
    }
};

// 페이지 로드가 완료되면 main 객체 초기화 실행
document.addEventListener('DOMContentLoaded', function () {
    main.init();
});
