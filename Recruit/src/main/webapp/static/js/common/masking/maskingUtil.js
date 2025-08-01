const maskingUtil = {
  /**
   * 이메일 마스킹 처리 함수
   *
   * 로컬파트(local part, @ 앞 부분)의 앞 3글자는 그대로 보여주고,
   * 나머지는 '*'로 마스킹합니다.
   * 
   * - 로컬파트가 3글자 이하일 경우 전부 '*'로 마스킹 처리합니다.
   * - 이메일 형식이 아니거나 빈 값이면 입력값 그대로 반환합니다.
   *
   * @param {string} email - 마스킹할 이메일 문자열
   * @returns {string} 마스킹된 이메일 또는 유효하지 않은 경우 원본 문자열 반환
   *
   * @example
   * maskingUtil.emailMasking('example@test.com'); // "exa****@test.com"
   * maskingUtil.emailMasking('abc@test.com');     // "abc@test.com" (3글자라 마스킹 없음)
   * maskingUtil.emailMasking('ab@test.com');      // "**@test.com"
   * maskingUtil.emailMasking('');                  // ""
   * maskingUtil.emailMasking(null);                // null
   * maskingUtil.emailMasking('notAnEmail');        // "notAnEmail" (이메일 아님)
   */
  emailMasking: function(email) {
    if (validationUtil.isEmpty(email)) return email;

    // 이메일 형식이 아니면 그대로 반환
    if (!validationUtil.isEmail(email)) return email;

    const [localPart, domain] = email.split('@');
    if (!localPart || localPart.length <= 3) {
      // 로컬파트가 3글자 이하인 경우 전부 '*' 처리
      return '*'.repeat(localPart.length) + '@' + domain;
    }

    // 앞 3글자는 보여주고 나머지는 '*' 처리
    const visibleCount = 3;
    const maskedPart = '*'.repeat(localPart.length - visibleCount);

    return localPart.substring(0, visibleCount) + maskedPart + '@' + domain;
  }
};