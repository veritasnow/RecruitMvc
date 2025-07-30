const formatUtil = {
	/**
	 * 숫자에 천 단위 콤마 삽입 (예: 1234567 -> "1,234,567")
	 * @param {string|number|null} value - 숫자 또는 문자열
	 * @returns {string} 포맷된 문자열
	 */
	formatMoney: function(value) {
		if (value == null) return '';
		const num = Number(String(value).replace(/,/g, ''));
		if (isNaN(num)) return '';
		return num.toLocaleString('en-US');
	},

	/**
	 * 핸드폰 번호에 하이픈 자동 삽입 (01012345678 -> 010-1234-5678)
	 * @param {string} value - 숫자 문자열
	 * @returns {string} 포맷된 전화번호
	 */
	formatPhoneNumber: function(value) {
		if (!value) return '';
		const digits = value.replace(/\D/g, '');
		if (digits.length === 10) {
			return digits.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
		} else if (digits.length === 11) {
			return digits.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
		} else {
			return value;
		}
	},

	/**
	 * 이메일 문자열을 소문자로 변환
	 * @param {string} value - 이메일 문자열
	 * @returns {string} 소문자로 변환된 이메일
	 */
	formatEmail: function(value) {
		if (!value) return '';
		return value.trim().toLowerCase();
	},

	/**
	 * 이름 문자열 앞뒤 공백 제거 및 중간 공백 하나로 정리
	 * @param {string} value - 이름 문자열
	 * @returns {string} 정리된 이름
	 */
	formatName: function(value) {
		if (!value) return '';
		return value.trim().replace(/\s+/g, ' ');
	},

	/**
	 * 모든 공백 제거
	 * @param {string} value - 입력 문자열
	 * @returns {string} 공백이 제거된 문자열
	 */
	removeAllWhitespace: function(value) {
		if (!value) return '';
		return value.replace(/\s+/g, '');
	},

	/**
	 * 우편번호 포맷팅 (5자리 또는 9자리 -> 12345 또는 12345-6789)
	 * @param {string} value - 우편번호 문자열
	 * @returns {string} 포맷된 우편번호
	 */
	formatZipCode: function(value) {
		if (!value) return '';
		const digits = value.replace(/\D/g, '');
		if (digits.length === 5) {
			return digits;
		} else if (digits.length === 9) {
			return digits.replace(/(\d{5})(\d{4})/, '$1-$2');
		} else {
			return value;
		}
	},

	/**
	 * 카드번호를 4자리마다 하이픈 삽입
	 * @param {string} value - 카드번호 문자열
	 * @returns {string} 포맷된 카드번호
	 */
	formatCardNumber: function(value) {
		if (!value) return '';
		const digits = value.replace(/\D/g, '');
		return digits.replace(/(.{4})/g, '$1-').slice(0, -1);
	},

	/**
	 * 날짜를 yyyy-mm-dd 형식으로 포맷 (Date 객체 또는 문자열 허용)
	 * @param {Date|string} value - 날짜 값
	 * @returns {string} 포맷된 날짜
	 */
	formatDateYYYYMMDD: function(value) {
		if (!value) return '';
		const date = new Date(value);
		if (isNaN(date.getTime())) return '';
		const yyyy = date.getFullYear();
		const mm = ('0' + (date.getMonth() + 1)).slice(-2);
		const dd = ('0' + date.getDate()).slice(-2);
		return `${yyyy}-${mm}-${dd}`;
	},

	/**
	 * 국제 전화번호 포맷팅 (예: 821012345678 -> +82 10 1234 5678)
	 * @param {string} value - 국제 전화번호
	 * @returns {string} 포맷된 전화번호
	 */
	formatIntlPhoneNumber: function(value) {
		if (!value) return '';
		const digits = value.replace(/\D/g, '');
		if (digits.startsWith('82') && digits.length === 11) {
			return `+82 ${digits.substr(2,2)} ${digits.substr(4,4)} ${digits.substr(8,4)}`;
		} else if (digits.length === 11 && digits.startsWith('0')) {
			return `+82 ${digits.substr(1,2)} ${digits.substr(3,4)} ${digits.substr(7,4)}`;
		}
		return value;
	},

	/**
	 * 집 전화번호에 하이픈 자동 삽입 (예: 0212345678 -> 02-1234-5678)
	 * @param {string} value - 집 전화번호 문자열
	 * @returns {string} 포맷된 집 전화번호
	 */
	formatLandlinePhoneNumber: function(value) {
		if (!value) return '';
		const digits = value.replace(/\D/g, '');
		if (digits.startsWith('02') && digits.length === 9) {
			return digits.replace(/(02)(\d{3})(\d{4})/, '$1-$2-$3');
		} else if (digits.startsWith('02') && digits.length === 10) {
			return digits.replace(/(02)(\d{4})(\d{4})/, '$1-$2-$3');
		} else if (digits.length === 10) {
			return digits.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
		} else if (digits.length === 11) {
			return digits.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
		} else {
			return value;
		}
	},

	/**
	 * 자격증 번호 하이픈 자동 삽입 (예: 123456789 -> 123-456-789)
	 * @param {string} value - 자격증 번호
	 * @returns {string} 포맷된 자격증 번호
	 */
	formatCertificateNumber: function(value) {
		if (!value) return '';
		const digits = value.replace(/\D/g, '');
		return digits.replace(/(\d{3})(\d{3})(\d{3})/, '$1-$2-$3');
	},

	/**
	 * 주소 공백 정리 (앞뒤 공백 제거 및 중간 공백 하나로 정리)
	 * @param {string} value - 주소 문자열
	 * @returns {string} 정리된 주소
	 */
	formatAddress: function(value) {
		if (!value) return '';
		return value.trim().replace(/\s+/g, ' ');
	},

	/**
	 * 경력 기간 포맷팅 (예: 201801 ~ 202012 -> 2018-01 ~ 2020-12)
	 * @param {string} value - 경력 기간 문자열
	 * @returns {string} 포맷된 경력 기간
	 */
	formatCareerPeriod: function(value) {
		if (!value) return '';
		const parts = value.replace(/\s+/g, '').split('~');
		if (parts.length !== 2) return value;
		const formatPart = (part) => {
			if (part.length === 6) {
				return part.slice(0,4) + '-' + part.slice(4,6);
			}
			return part;
		};
		return `${formatPart(parts[0])} ~ ${formatPart(parts[1])}`;
	},

	/**
	 * 학력 기간 포맷팅 (예: 2015.03 - 2019.02 -> 2015-03 - 2019-02)
	 * @param {string} value - 학력 기간 문자열
	 * @returns {string} 포맷된 학력 기간
	 */
	formatEducationPeriod: function(value) {
		if (!value) return '';
		const parts = value.replace(/\s+/g, '').split('-');
		if (parts.length !== 2) return value;
		const formatPart = (part) => {
			return part.replace(/[./]/g, '-');
		};
		return `${formatPart(parts[0])} - ${formatPart(parts[1])}`;
	},
};