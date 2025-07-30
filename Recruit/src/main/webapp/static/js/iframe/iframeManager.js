const iframeManager = {
	// 탭 영역 요소
	tabsEl: document.getElementById('tabs'),
	// iframe 컨테이너 요소
	iframeContainer: document.getElementById('iframe-container'),
	// 스크롤 좌/우 버튼 요소
	scrollLeftBtn: document.getElementById('scroll-left'),
	scrollRightBtn: document.getElementById('scroll-right'),

	// 현재 열린 탭 목록 [{ id, title, url }]
	tabs: [],

	/**
	 * 탭 생성 및 활성화
	 * 이미 존재하면 활성화만 수행, 없으면 추가
	 * @param {string} id - 탭 ID (보통 URL을 base64로 인코딩)
	 * @param {string} title - 탭 제목
	 * @param {string} url - iframe에 표시할 URL
	 */
	createTab(id, title, url) {
		if (this.tabs.find(t => t.id === id)) {
			this.activateTab(id);
			return;
		}
		this.tabs.push({ id, title, url });
		this.renderTabs();
		this.addIframe(id, url);
		this.activateTab(id);
	},

	/**
	 * 탭 제거 및 연결된 iframe 삭제
	 * @param {string} id - 삭제할 탭의 ID
	 */
	removeTab(id) {
		const idx = this.tabs.findIndex(t => t.id === id);
		if (idx === -1) return;
		this.tabs.splice(idx, 1);

		const iframe = document.getElementById('iframe_' + id);
		if (iframe) iframe.remove();

		if (this.tabs.length === 0) {
			this.renderTabs();
			return;
		}

		// 현재 활성 탭이 삭제된 경우 다른 탭을 활성화
		const activeTab = this.tabsEl.querySelector('.tab.active');
		if (activeTab && activeTab.dataset.id === id) {
			const nextTab = this.tabs[idx] || this.tabs[idx - 1];
			this.activateTab(nextTab.id);
		}
		this.renderTabs();
	},

	/**
	 * 특정 탭을 활성화
	 * 탭과 iframe 모두 표시 상태 조정
	 * @param {string} id - 활성화할 탭 ID
	 */
	activateTab(id) {
		const allTabs = this.tabsEl.querySelectorAll('.tab');
		allTabs.forEach(tab => {
			tab.classList.toggle('active', tab.dataset.id === id);
		});

		const iframes = this.iframeContainer.querySelectorAll('iframe');
		iframes.forEach(iframe => {
			iframe.style.display = (iframe.id === 'iframe_' + id) ? 'block' : 'none';
		});

		this.scrollToTab(id);
	},

	/**
	 * iframe 생성 및 컨테이너에 추가
	 * @param {string} id - iframe ID (탭 ID와 연동)
	 * @param {string} url - iframe에 로드할 URL
	 */
	addIframe(id, url) {
		const iframe = document.createElement('iframe');
		iframe.id = 'iframe_' + id;
		iframe.src = url;
		iframe.style.display = 'none';
		iframe.style.width = '100%';
		iframe.style.height = '100%';
		iframe.style.border = 'none';
		this.iframeContainer.appendChild(iframe);
	},

	/**
	 * 현재 tabs 배열을 기준으로 탭 목록을 렌더링
	 * 닫기 버튼, 클릭 이벤트 설정 포함
	 */
	renderTabs() {
		this.tabsEl.innerHTML = '';
		this.tabs.forEach(tab => {
			const tabEl = document.createElement('div');
			tabEl.className = 'tab';
			tabEl.dataset.id = tab.id;
			tabEl.textContent = tab.title;

			// 닫기 버튼
			const closeBtn = document.createElement('span');
			closeBtn.className = 'close-btn';
			closeBtn.textContent = '×';
			closeBtn.title = '닫기';
			closeBtn.onclick = e => {
				e.stopPropagation(); // 탭 활성화 방지
				this.removeTab(tab.id);
			};
			tabEl.appendChild(closeBtn);

			// 탭 클릭 시 활성화
			tabEl.onclick = () => this.activateTab(tab.id);
			this.tabsEl.appendChild(tabEl);
		});
	},

	/**
	 * 특정 탭이 화면에 보이도록 좌우 스크롤 조정
	 * @param {string} id - 탭 ID
	 */
	scrollToTab(id) {
		const tabEl = this.tabsEl.querySelector(`.tab[data-id="${id}"]`);
		if (!tabEl) return;

		const tabBarRect = this.tabsEl.getBoundingClientRect();
		const tabRect = tabEl.getBoundingClientRect();

		// 왼쪽으로 벗어난 경우
		if (tabRect.left < tabBarRect.left) {
			this.tabsEl.scrollBy({ left: tabRect.left - tabBarRect.left - 10, behavior: 'smooth' });
		}
		// 오른쪽으로 벗어난 경우
		else if (tabRect.right > tabBarRect.right) {
			this.tabsEl.scrollBy({ left: tabRect.right - tabBarRect.right + 10, behavior: 'smooth' });
		}
	},

	/**
	 * iframeManager 초기화
	 * - 좌우 스크롤 버튼 이벤트 바인딩
	 * - 사이드 메뉴 클릭 이벤트 처리 (탭 생성)
	 */
	init() {
		this.scrollLeftBtn.onclick = () => {
			this.tabsEl.scrollBy({ left: -150, behavior: 'smooth' });
		};
		this.scrollRightBtn.onclick = () => {
			this.tabsEl.scrollBy({ left: 150, behavior: 'smooth' });
		};

		// 메뉴 클릭 시 탭 생성 (데이터 속성 기반)
		document.getElementById('sidebar').addEventListener('click', e => {
			const li = e.target.closest('li');
			if (!li) return;
			const url = li.dataset.url;
			const title = li.dataset.title;
			if (url && title) {
				const id = btoa(url); // URL을 base64 인코딩하여 ID로 사용
				this.createTab(id, title, url);
			}
		});
	}
};

// 페이지 로드 완료 후 iframeManager 초기화 실행
document.addEventListener('DOMContentLoaded', () => {
	iframeManager.init();
});