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
	/**
	 * 사업자등록번호 유효성 체크
	 * - 10자리 숫자, 특정 가중치와 체크코드로 검증
	 * @param {string} value - 사업자등록번호 문자열 (숫자만 또는 하이픈 포함 가능)
	 * @returns {boolean} - 유효하면 true, 아니면 false
	 */
	isBusinessNumber: function(value) {
		if (!value) return false;
		const digits = value.replace(/-/g, '');
		if (!/^\d{10}$/.test(digits)) return false;

		const weights = [1, 3, 7, 1, 3, 7, 1, 3, 5];
		let sum = 0;

		for (let i = 0; i < 9; i++) {
			sum += parseInt(digits[i], 10) * weights[i];
		}

		sum += Math.floor((parseInt(digits[8], 10) * 5) / 10);
		const checkDigit = (10 - (sum % 10)) % 10;

		return checkDigit === parseInt(digits[9], 10);
	},

	/**
	 * 주민등록번호 (주민번호) 유효성 체크
	 * - 13자리 숫자, 생년월일 및 체크 알고리즘 확인
	 * @param {string} value - 주민등록번호 (숫자만 또는 하이픈 포함 가능)
	 * @returns {boolean} - 유효하면 true, 아니면 false
	 */
	isSSN: function(value) {
		if (!value) return false;
		const digits = value.replace(/-/g, '');
		if (!/^\d{13}$/.test(digits)) return false;

		// 생년월일 유효성 검사 (앞 6자리)
		const birth = digits.substr(0, 6);
		const yearPrefixMap = { '1': 19, '2': 19, '3': 20, '4': 20, '5': 19, '6': 19, '7': 20, '8': 20, '9': 18, '0': 18 };
		const genderCode = digits.charAt(6);
		const yearPrefix = yearPrefixMap[genderCode];
		if (yearPrefix === undefined) return false;

		const year = yearPrefix + parseInt(birth.substr(0, 2), 10);
		const month = parseInt(birth.substr(2, 2), 10);
		const day = parseInt(birth.substr(4, 2), 10);
		const birthDate = new Date(year, month - 1, day);
		if (birthDate.getFullYear() !== year || birthDate.getMonth() + 1 !== month || birthDate.getDate() !== day) return false;

		// 체크sum 계산
		const multipliers = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5];
		let sum = 0;
		for (let i = 0; i < 12; i++) {
			sum += parseInt(digits.charAt(i), 10) * multipliers[i];
		}

		const mod = sum % 11;
		const checkDigit = (11 - mod) % 10;

		return checkDigit === parseInt(digits.charAt(12), 10);
	},

	/**
	 * 숫자와 하이픈(-)만 포함되었는지 검사
	 * @param {string} value
	 * @returns {boolean}
	 */
	hasOnlyNumbersAndHyphens: function(value) {
		if (!value) return false;
		return /^[\d-]+$/.test(value);
	},		
};