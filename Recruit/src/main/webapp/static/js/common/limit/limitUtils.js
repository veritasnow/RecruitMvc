/**
 * 입력 길이 및 자릿수 관련 유틸리티 함수 모음
 */
const limitUtils = {
	/**
	 * 최대 길이 제한 (input 태그의 maxlength 속성을 기반으로 값 자르기)
	 *
	 * - 입력 요소의 `value` 길이가 `maxLength`를 초과하면 자릅니다.
	 * - 주로 숫자, 텍스트 등에서 사용됩니다.
	 *
	 * @param {HTMLInputElement | HTMLTextAreaElement} element - 검사할 input/textarea 요소
	 *
	 * @example
	 * <input type="text" maxlength="5" oninput="limitUtils.enforceMaxLength(this)">
	 * // 사용자 입력이 6글자를 넘으면 자동으로 5글자로 잘림
	 */
	enforceMaxLength: function (element) {
		if (element && element.maxLength && element.value.length > element.maxLength) {
			element.value = element.value.slice(0, element.maxLength);
		}
	},

	/**
	 * 문자열이 주어진 최대 길이를 초과하는 경우 잘라낸 문자열 반환
	 *
	 * - 입력값 자체를 자르기만 하며, DOM 조작은 하지 않습니다.
	 * - 순수한 유효성 처리나 데이터 정제에 유용합니다.
	 *
	 * @param {string} str - 검사할 문자열
	 * @param {number} maxLength - 허용할 최대 길이
	 * @returns {string} - 잘린 문자열
	 *
	 * @example
	 * const trimmed = limitUtils.trimToMaxLength("abcdefg", 5); // "abcde"
	 */
	trimToMaxLength: function (str, maxLength) {
		if (typeof str !== 'string') return '';
		return str.length > maxLength ? str.slice(0, maxLength) : str;
	}
};