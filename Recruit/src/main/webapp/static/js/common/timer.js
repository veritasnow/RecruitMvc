const timerUtil = {
  iSecond: 0,
  timerChecker: null,
  ifun: null,

  /**
   * 숫자를 두 자리 문자열로 변환 (앞에 0 붙임)
   * @param {number|string} num
   * @returns {string}
   */
  padZero: function(num) {
    num = String(num);
    while (num.length < 2) {
      num = "0" + num;
    }
    return num;
  },

  /**
   * 타이머 내부 함수 (재귀 호출)
   * @param {string} id - 시간을 표시할 HTML 요소 id
   */
  initTimer: function(id) {
    const self = this;
    const input = document.getElementById(id);
    if (!input) return;

    const rMinute = Math.floor(self.iSecond / 60);
    const rSecond = self.iSecond % 60;

    if (self.iSecond > 0) {
      input.textContent = self.padZero(rMinute) + ":" + self.padZero(rSecond);
      self.iSecond--;
      self.timerChecker = setTimeout(function() {
        self.initTimer(id);
      }, 1000);
    } else {
      input.textContent = '00:00';
      if (typeof self.ifun === 'function') {
        self.ifun();
      }
    }
  },

  /**
   * 타이머 시작
   * @param {string} id - 시간을 표시할 HTML 요소 id
   * @param {number} seconds - 타이머 시작 시간(초)
   * @param {function} callback - 시간이 끝났을 때 실행할 함수
   */
  start: function(id, seconds, callback) {
    if (this.timerChecker) {
      clearTimeout(this.timerChecker);
      this.timerChecker = null;
    }
    this.iSecond = seconds || 0;
    this.ifun = callback || null;
    this.initTimer(id);
  },

  /**
   * 타이머 중지
   */
  stop: function() {
    if (this.timerChecker) {
      clearTimeout(this.timerChecker);
      this.timerChecker = null;
    }
  },

  /**
   * 남은 시간에 초를 더해서 타이머 연장
   * @param {number} addSeconds - 추가할 초
   */
  extend: function(addSeconds) {
    if (typeof addSeconds !== 'number' || addSeconds <= 0) return;
    this.iSecond += addSeconds;
  }
};