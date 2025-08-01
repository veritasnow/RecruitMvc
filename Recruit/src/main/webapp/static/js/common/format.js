const formatUtil = {
	/**
	 * null 또는 undefined를 지정된 기본값으로 치환
	 * @param {*} value - 원본 값
	 * @param {*} defaultValue - 대체 값 (기본값: "")
	 * @returns {*} 원본 값 또는 대체 값
	 */
	formatNull: function(value, defaultValue = '') {
		return (value === undefined || value === null || value === 'undefined') ? defaultValue : value;
	},	
	
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
	 * 날짜를 `yyyy-mm-dd` 형식으로 변환  
	 * 📥 입력: `Date 객체` 또는 날짜 문자열 (e.g. `"2025-07-31"`, `"Jul 31, 2025"`)  
	 * 📤 출력: `"2025-07-31"` (유효하지 않으면 `''` 반환)
	 *
	 * @param {Date|string} value - Date 객체 또는 파싱 가능한 날짜 문자열
	 * @returns {string} 포맷된 날짜 문자열 (형식: "YYYY-MM-DD")
	 *
	 * @example
	 * formatDateYYYYMMDD(new Date(2025, 6, 31)) // "2025-07-31"
	 * formatDateYYYYMMDD("2025-07-31")          // "2025-07-31"
	 * formatDateYYYYMMDD("Jul 31, 2025")        // "2025-07-31"
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
	 * 날짜 문자열에서 구분자(`-`, `:`, `.`, 공백 등)를 제거하고 숫자만 추출  
	 * 📥 입력: `"2024-07-31 14:30"` 또는 `"2024.07.31 14:30"`  
	 * 📤 출력: `"202407311430"` 또는 `"20240731"` (길이에 따라 절삭)
	 *
	 * @param {string} value - 날짜 문자열 (형식 무관, 구분자 포함 가능)
	 * @returns {string} 숫자만 남은 날짜 문자열 (최대 16자리까지 자름)
	 *
	 * @example
	 * formatDateCompact("2024-07-31")              // "20240731"
	 * formatDateCompact("2024-07-31 14:30")        // "202407311430"
	 * formatDateCompact("2024.07.31 14:30:59")     // "20240731143059"
	 */
	formatDateCompact: function(value) {
		if (!value) return '';
		const clean = value.replace(/[-:.\s]/g, '');
		return clean.length > 14 ? clean.slice(0, 16) : clean.slice(0, 10);
	},

	/**
	 * 압축된 날짜 문자열을 사람이 읽을 수 있는 형식으로 변환  
	 * 📥 입력: `"20250731"` 또는 `"20250731123045"`  
	 * 📤 출력: `"2025-07-31"` 또는 `"2025-07-31 12:30:45"`  
	 * 💡 유효하지 않은 형식은 빈 문자열 반환
	 *
	 * @param {string} value - 숫자형 날짜 문자열 (YYYYMMDD 또는 YYYYMMDDHHMISS)
	 * @returns {string} 포맷된 날짜 문자열 ("YYYY-MM-DD" 또는 "YYYY-MM-DD HH:MM:SS")
	 *
	 * @example
	 * formatDateReadable("20250731")         // "2025-07-31"
	 * formatDateReadable("20250731123045")   // "2025-07-31 12:30:45"
	 */
	formatDateReadable: function(value) {
		if (!value || typeof value !== 'string') return '';
		const cleaned = value.replace(/\D/g, '');
		if (cleaned.length === 8) {
			return `${cleaned.slice(0,4)}-${cleaned.slice(4,6)}-${cleaned.slice(6,8)}`;
		} else if (cleaned.length === 14) {
			return `${cleaned.slice(0,4)}-${cleaned.slice(4,6)}-${cleaned.slice(6,8)} ` +
			       `${cleaned.slice(8,10)}:${cleaned.slice(10,12)}:${cleaned.slice(12,14)}`;
		}
		return '';
	},
		
	/**
	 * 날짜 문자열(yyyymmdd 또는 yyyy-mm-dd)을 받아서 "yyyy-mm-dd(요일)" 형식으로 반환
	 * @param {string} param - 날짜 문자열 (예: "20250731", "2025-07-31")
	 * @param {string} [sep='-'] - 날짜 구분자 (예: '-', '.', '/')
	 * @param {boolean} [lastSepYn=true] - 날짜 뒤에 구분자를 붙일지 여부
	 * @param {boolean} [dayFullName=false] - 요일을 전체 이름으로 표시할지 여부 (예: '월요일')
	 * @param {boolean} [spacing=false] - 날짜와 요일 사이에 공백을 넣을지 여부
	 * @returns {string} "yyyy-mm-dd(월)" 또는 옵션에 따른 포맷 문자열 반환, 잘못된 입력 시 빈 문자열 반환
	 *
	 * @example
	 * formatUtil.formatDateWithDay("20250731")                     // "2025-07-31-(목)"
	 * formatUtil.formatDateWithDay("20250731", '-', false, true)  // "2025-07-31(목요일)"
	 * formatUtil.formatDateWithDay("2025-07-31", '.', true, false, true) // "2025.07.31 (목)"
	 */
	formatDateWithDay: function(param, sep = '-', lastSepYn = true, dayFullName = false, spacing = false) {
		if (typeof param !== 'string' || param.length < 8) {
			return '';
		}
	
		const digitsOnly = param.replace(/\D/g, '').slice(0, 8);
		if (digitsOnly.length !== 8) {
			return '';
		}
	
		const formattedDate = digitsOnly.slice(0, 4) + sep + digitsOnly.slice(4, 6) + sep + digitsOnly.slice(6, 8);
	
		const dateObj = new Date(`${digitsOnly.slice(0, 4)}-${digitsOnly.slice(4, 6)}-${digitsOnly.slice(6, 8)}`);
		if (isNaN(dateObj.getTime())) {
			return '';
		}
	
		const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
		const dayIndex = dateObj.getDay();
		const dayStr = weekdays[dayIndex] + (dayFullName ? '요일' : '');
	
		const lastSeparator = lastSepYn ? sep : '';
		const space = spacing ? ' ' : '';
	
		return `${formattedDate}${lastSeparator}${space}(${dayStr})`;
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
	/**
	 * 주민등록번호 포맷팅 (예: 9001011234567 -> 900101-1234567)
	 * @param {string} value - 주민등록번호 문자열
	 * @returns {string} 포맷된 주민등록번호
	 */
	formatSSN: function(value) {
		if (!value) return '';
		const digits = value.replace(/\D/g, '');
		if (digits.length !== 13) return value;
		return digits.replace(/(\d{6})(\d{7})/, '$1-$2');
	},

	/**
	 * 사업자등록번호 포맷팅 (예: 1234512345 -> 123-45-12345)
	 * @param {string} value - 사업자등록번호 문자열
	 * @returns {string} 포맷된 사업자등록번호
	 */
	formatBusinessNumber: function(value) {
		if (!value) return '';
		const digits = value.replace(/\D/g, '');
		if (digits.length !== 10) return value;
		return digits.replace(/(\d{3})(\d{2})(\d{5})/, '$1-$2-$3');
	},

	/**
	 * 숫자를 퍼센트 문자열로 변환 (예: 0.25 -> "25%")
	 * @param {number|string} value - 숫자 또는 문자열
	 * @returns {string} 퍼센트 형식 문자열
	 */
	formatPercent: function(value) {
		if (value == null) return '';
		const num = Number(value);
		if (isNaN(num)) return '';
		return `${(num * 100).toFixed(2)}%`;
	},

	/**
	 * 문자열을 대문자로 변환
	 * @param {string} value - 입력 문자열
	 * @returns {string} 대문자로 변환된 문자열
	 */
	toUpperCase: function(value) {
		if (!value) return '';
		return value.toUpperCase();
	},

	/**
	 * 문자열을 첫 글자만 대문자로 변환 (capitalize)
	 * @param {string} value - 입력 문자열
	 * @returns {string} Capitalized 문자열
	 */
	capitalize: function(value) {
		if (!value) return '';
		return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
	},

	/**
	 * 은행 계좌번호 하이픈 포맷팅 (예: 12345678901234 -> 123-456-78901234)
	 * @param {string} value - 계좌번호 문자열
	 * @returns {string} 포맷된 계좌번호
	 */
	formatBankAccount: function(value) {
		if (!value) return '';
		const digits = value.replace(/\D/g, '');
		if (digits.length < 9) return value;
		return digits.replace(/(\d{3})(\d{3})(\d+)/, '$1-$2-$3');
	},

	/**
	 * 시간 문자열 포맷팅 (예: "1305" -> "13:05")
	 * @param {string} value - 시간 문자열
	 * @returns {string} 포맷된 시간 (HH:mm)
	 */
	formatTimeHHMM: function(value) {
		if (!value) return '';
		const digits = value.replace(/\D/g, '');
		if (digits.length !== 4) return value;
		return digits.replace(/(\d{2})(\d{2})/, '$1:$2');
	},

	/**
	 * 문자열에서 숫자만 추출
	 * @param {string} value - 입력 문자열
	 * @returns {string} 숫자만 포함된 문자열
	 */
	extractDigits: function(value) {
		if (!value) return '';
		return value.replace(/\D/g, '');
	},	
	
};