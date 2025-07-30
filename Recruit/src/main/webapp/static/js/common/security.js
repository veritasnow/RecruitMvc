const securityUtil = {
	/**
	 * 문자열 내 HTML 태그를 이스케이프하여 XSS 방지
	 * @param {string} str - 이스케이프할 문자열
	 * @returns {string} - 이스케이프된 문자열
	 */
	escapeHtml: function(str) {
		if (!str) return '';
		return str
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#039;');
	},

	/**
	 * DOM 요소에 텍스트를 안전하게 삽입 (innerHTML 대신 textContent 사용)
	 * @param {HTMLElement} element - 텍스트를 삽입할 DOM 요소
	 * @param {string} text - 삽입할 텍스트
	 */
	safeTextInsert: function(element, text) {
		if (element) element.textContent = text;
	},

	/**
	 * 입력값에 XSS 또는 위험한 스크립트 속성이 포함되어 있는지 검사
	 * @param {string} value - 검사할 문자열
	 * @returns {boolean} - 안전한 경우 true, 위험 요소가 있으면 false
	 */
	isSafeInput: function(value) {
		if (!value) return true;
		return !(/<script|on\w+=|javascript:|data:/i).test(value.toLowerCase());
	},

	/**
	 * 입력값에서 스크립트 및 위험한 속성 제거 (기초적인 정제)
	 * @param {string} value - 정제할 문자열
	 * @returns {string} - 정제된 문자열
	 */
	sanitizeInput: function(value) {
		if (!value) return '';
		return value
			.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, '')
			.replace(/on\w+="[^"]*"/gi, '')
			.replace(/javascript:/gi, '');
	},

	/**
	 * 콘솔 로그 출력을 차단 (운영 환경에서 디버깅 방지 목적)
	 * 로그, 디버그, 워닝을 모두 무력화
	 */
	blockConsole: function() {
		console.log = function() {};
		console.debug = function() {};
		console.warn = function() {};
	}
};