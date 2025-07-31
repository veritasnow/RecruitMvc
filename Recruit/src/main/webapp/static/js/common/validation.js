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
	 * 입력된 값이 유효한 날짜 형식인지 검사합니다.
	 * 
	 * - YYYYMMDD 형식의 8자리 숫자 문자열을 정확히 검사합니다.
	 * - 일반적인 날짜 문자열이나 Date 객체도 검사 가능합니다.
	 * 
	 * @param {string|Date} value - 검사할 날짜 값 (문자열 또는 Date 객체)
	 * @returns {boolean} 유효한 날짜면 true, 아니면 false
	 * 
	 * @example
	 * isValidDate("20230731");      // true
	 * isValidDate("20230229");      // false (2023년 2월 29일은 없음)
	 * isValidDate("2023-07-31");    // true
	 * isValidDate(new Date());      // true (오늘 날짜)
	 * isValidDate("invalid date");  // false
	 */
	isValidDate: function(value) {
	    // 값이 비어있으면 false 반환
	    if (this.isEmpty(value)) return false;
	
	    // YYYYMMDD 형식 (8자리 숫자 문자열)인 경우에만 세부 검사 진행
	    if (typeof value === 'string' && /^\d{8}$/.test(value)) {
	        // 년, 월, 일 분리
	        const year = parseInt(value.slice(0, 4), 10);
	        const month = parseInt(value.slice(4, 6), 10);
	        const day = parseInt(value.slice(6, 8), 10);
	
	        // 월은 1~12, 일은 1~31 범위 내인지 기본 체크
	        if (month < 1 || month > 12 || day < 1 || day > 31) return false;
	
	        // Date 객체 생성 (월은 0부터 시작하므로 -1)
	        const date = new Date(year, month - 1, day);
	
	        // 실제 Date 객체의 년, 월, 일이 입력값과 동일한지 확인
	        // (예: 2023-02-30 → 실제로는 3월 2일로 넘어가므로 false 처리)
	        return date.getFullYear() === year &&
	               date.getMonth() === month - 1 &&
	               date.getDate() === day;
	    }
	
	    // YYYYMMDD 형식이 아닌 경우, Date 생성 후 유효성 검사
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
	 * 영문/숫자/특수문자를 포함하고 8~16자 사이인지 검사
	 * @param {string} value
	 * @returns {boolean}
	 */
	isPasswordValidBasic: function (value) {
		return /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]{8,16}$/.test(value);
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
		const birth = digits.substring(0, 6);
		const yearPrefixMap = { 
			'1': 19, '2': 19, '3': 20, '4': 20, 
			'5': 19, '6': 19, '7': 20, '8': 20, 
			'9': 18, '0': 18 
		};
		const genderCode = digits.charAt(6);
		const yearPrefix = yearPrefixMap[genderCode];
		if (yearPrefix === undefined) return false;
	
		const year = yearPrefix + parseInt(birth.substring(0, 2), 10);
		const month = parseInt(birth.substring(2, 4), 10);
		const day = parseInt(birth.substring(4, 6), 10);
		const birthDate = new Date(year, month - 1, day);
	
		if (
			birthDate.getFullYear() !== year || 
			birthDate.getMonth() + 1 !== month || 
			birthDate.getDate() !== day
		) return false;
	
		// 체크섬 계산
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
	 * HHMM 형식의 시간을 검사합니다.
	 * - 4자리 숫자 문자열이어야 합니다.
	 * - HH는 00~23, MM은 00~59 범위여야 합니다.
	 * 
	 * @param {string} value - 검사할 시간 문자열 (예: "0930", "2359")
	 * @returns {boolean} 유효한 시간이면 true, 아니면 false
	 * 
	 * @example
	 * isValidTimeHHMM("0000"); // true
	 * isValidTimeHHMM("2359"); // true
	 * isValidTimeHHMM("2400"); // false (HH가 24 이상)
	 * isValidTimeHHMM("1260"); // false (MM이 60 이상)
	 * isValidTimeHHMM("12a0"); // false (숫자가 아님)
	 * isValidTimeHHMM("123");  // false (길이 4가 아님)
	 */
	isValidTimeHHMM: function(value) {
		if (this.isEmpty(value)) return false;
		if (typeof value !== 'string' || value.length !== 4) return false;
		if (!/^\d{4}$/.test(value)) return false;

		const hh = parseInt(value.substring(0, 2), 10);
		const mm = parseInt(value.substring(2, 4), 10);
		
		if (hh < 0 || hh > 23) return false;
		if (mm < 0 || mm > 59) return false;

		return true;
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