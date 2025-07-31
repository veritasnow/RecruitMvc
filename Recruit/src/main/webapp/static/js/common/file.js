const inputUtils = {
  /**
   * 입력 필드에 글자 수 제한 및 현재 글자 수 표시 기능을 추가합니다.
   * - 지정한 최대 글자 수(size)를 초과하면 자동으로 잘라냅니다.
   * - 입력된 글자 수를 지정한 출력 요소에 표시합니다.
   * - 옵션을 통해 단위 문자(unit)와 글자 수 초과 시 실행할 콜백(onLimitReached)을 지정할 수 있습니다.
   *
   * @param {string} id - 글자 수를 체크할 input 또는 textarea 요소의 ID
   * @param {string} outId - 현재 글자 수를 표시할 요소의 ID
   * @param {number} size - 최대 입력 글자 수 제한
   * @param {object} [options] - 추가 옵션 객체
   * @param {string} [options.unit='자'] - 글자 수 뒤에 붙일 단위 문자열 (예: '자', '글자')
   * @param {function} [options.onLimitReached] - 최대 글자 수 초과 시 호출할 콜백 함수
   *
   * @example
   * // input#myInput에 최대 50글자 제한을 걸고, #myOutput에 글자 수 표시
   * inputUtils.fnInputTextSizeCheck('myInput', 'myOutput', 50, {
   *   unit: '글자',
   *   onLimitReached: () => alert('최대 글자 수에 도달했습니다!')
   * });
   */
  fnInputTextSizeCheck: function(id, outId, size, options = {}) {
    const input = document.getElementById(id);
    const output = document.getElementById(outId);
    const unit = options.unit || '자';

    // input이나 output 요소가 없으면 함수 종료
    if (!input || !output) return;

    // 입력값 변화 시마다 처리
    input.addEventListener('input', () => {
      let content = input.value;

      // 글자가 없으면 0 + 단위 표시
      if (content.length === 0) {
        output.textContent = '0' + unit;
      } else {
        // 현재 글자 수 + 단위 표시
        output.textContent = content.length + unit;
      }

      // 최대 글자 수 초과 시 자르고 콜백 호출
      if (content.length > size) {
        input.value = content.substring(0, size);
        output.textContent = size + unit;
        if (typeof options.onLimitReached === 'function') {
          options.onLimitReached();
        }
      }
    });
  }
};