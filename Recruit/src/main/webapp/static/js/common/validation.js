const validationUtil = {
	/**
	 * 값이 null, undefined 또는 공백 문자열인지 확인
	 * @param {*} value - 검사할 값
	 * @returns {boolean} - 비어 있으면 true
	 */
	isEmpty: function (value) {
		return value == null || String(value).trim() === '';
	},

	/**
	 * 값이 숫자인지 확인
	 * @param {*} value - 검사할 값
	 * @returns {boolean} - 숫자이면 true
	 */
	isNumber: function (value) {
		return !this.isEmpty(value) && !isNaN(value);
	},

	/**
	 * 값이 정수인지 확인
	 * @param {*} value - 검사할 값
	 * @returns {boolean} - 정수이면 true
	 */
	isInteger: function (value) {
		return this.isNumber(value) && Number.isInteger(Number(value));
	},

	/**
	 * 영문자만 포함되었는지 확인 (A-Z, a-z)
	 * @param {string} value
	 * @returns {boolean}
	 */
	isAlpha: function (value) {
		return /^[A-Za-z]+$/.test(value);
	},

	/**
	 * 영문자 또는 숫자만 포함되었는지 확인
	 * @param {string} value
	 * @returns {boolean}
	 */
	isAlphaNumeric: function (value) {
		return /^[A-Za-z0-9]+$/.test(value);
	},

	/**
	 * 한글만 포함되었는지 확인
	 * @param {string} value
	 * @returns {boolean}
	 */
	isKorean: function (value) {
		return /^[가-힣]+$/.test(value);
	},

	/**
	 * 유효한 날짜 형식인지 확인
	 * @param {string|Date} value
	 * @returns {boolean}
	 */
	isValidDate: function (value) {
		if (this.isEmpty(value)) return false;
		const date = new Date(value);
		return !isNaN(date.getTime());
	},

	/**
	 * 과거 날짜인지 확인 (오늘보다 이전)
	 * @param {string|Date} value
	 * @returns {boolean}
	 */
	isPastDate: function (value) {
		const date = new Date(value);
		const now = new Date();
		return this.isValidDate(value) && date < now;
	},

	/**
	 * 미래 날짜인지 확인 (오늘보다 이후)
	 * @param {string|Date} value
	 * @returns {boolean}
	 */
	isFutureDate: function (value) {
		const date = new Date(value);
		const now = new Date();
		return this.isValidDate(value) && date > now;
	},

	/**
	 * 이메일 형식인지 확인
	 * @param {string} value
	 * @returns {boolean}
	 */
	isEmail: function (value) {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
	},

	/**
	 * 휴대폰 번호 형식인지 확인 (010, 011 등)
	 * @param {string} value
	 * @returns {boolean}
	 */
	isPhoneNumber: function (value) {
		return /^01[0-9]-?\d{3,4}-?\d{4}$/.test(value);
	},

	/**
	 * 강력한 비밀번호 형식인지 확인
	 * 조건: 대소문자 + 숫자 + 특수문자 포함, 최소 8자
	 * @param {string} value
	 * @returns {boolean}
	 */
	isStrongPassword: function (value) {
		return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(value);
	},

	/**
	 * 중간 수준의 비밀번호 형식인지 확인
	 * 조건: 문자 + 숫자 + 특수문자 포함, 최소 8자
	 * @param {string} value
	 * @returns {boolean}
	 */
	isMediumPassword: function (value) {
		return /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(value);
	},

	/**
	 * 기본 수준의 비밀번호 형식인지 확인
	 * 조건: 문자 + 숫자 포함, 최소 6자
	 * @param {string} value
	 * @returns {boolean}
	 */
	isBasicPassword: function (value) {
		return /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{6,}$/.test(value);
	},

	/**
	 * 공백 문자(띄어쓰기 등)가 포함되어 있는지 확인
	 * @param {string} value
	 * @returns {boolean}
	 */
	containsWhitespace: function (value) {
		return /\s/.test(value);
	},

	/**
	 * 문자열 길이가 min ~ max 사이인지 확인
	 * @param {string} value
	 * @param {number} min
	 * @param {number} max
	 * @returns {boolean}
	 */
	hasLengthBetween: function (value, min, max) {
		if (this.isEmpty(value)) return false;
		const len = value.length;
		return len >= min && len <= max;
	},

	/**
	 * before가 after보다 작거나 같은지 확인
	 * 날짜, 숫자, 문자열 비교 모두 지원
	 * @param {*} before
	 * @param {*} after
	 * @returns {boolean}
	 */
	isBeforeOrEqual: function(before, after) {
		if (this.isEmpty(before) || this.isEmpty(after)) return false;

		// 날짜 비교
		const beforeDate = new Date(before);
		const afterDate  = new Date(after);
		if (!isNaN(beforeDate.getTime()) && !isNaN(afterDate.getTime())) {
			return beforeDate.getTime() <= afterDate.getTime();
		}

		// 숫자 비교
		const beforeNum = Number(String(before).replace(/,/g, ''));
		const afterNum  = Number(String(after).replace(/,/g, ''));
		if (!isNaN(beforeNum) && !isNaN(afterNum)) {
			return beforeNum <= afterNum;
		}

		// 문자열 비교 (사전 순)
		return String(before) <= String(after);
	},
};