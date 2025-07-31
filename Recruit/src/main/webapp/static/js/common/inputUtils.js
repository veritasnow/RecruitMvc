const fileUtil = {
  // 허용된 파일 확장자 리스트
  allowedExtensions: [
    "jpg", "jpeg", "png", "gif", "bmp", "webp",
    "pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx", "txt", "csv",
    "zip", "rar", "7z",
    "mp3", "wav", "mp4", "mov"
  ],

  /**
   * 파일명에서 확장자 추출 후 허용 여부 체크
   * @param {string} fileName - 파일명 (ex: "photo.jpg")
   * @returns {boolean} 확장자 허용 여부
   */
  checkFileExtension: function(fileName) {
    if (typeof fileName !== "string") return false;
    const parts = fileName.split('.');
    if (parts.length < 2) return false; // 확장자가 없음
    const extension = parts.pop().toLowerCase();
    return this.allowedExtensions.includes(extension);
  },

  /**
   * 파일 사이즈가 제한을 초과했는지 체크
   * @param {File} file - File 객체 (input.files[0])
   * @param {number} maxSizeMB - 최대 허용 크기(MB)
   * @returns {boolean} 사이즈가 제한 이내면 true, 초과하면 false
   */
  checkFileSize: function(file, maxSizeMB) {
    if (!file || typeof file.size !== "number") return false;
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    return file.size <= maxSizeBytes;
  },

  /**
   * 파일 유효성 검사 (확장자 + 사이즈)
   * @param {HTMLInputElement} inputElem - 파일 input 요소
   * @param {number} maxSizeMB - 최대 파일 사이즈 (MB)
   * @returns {boolean} 유효하면 true, 아니면 false (알림창 표시)
   */
  validateFile: function(inputElem, maxSizeMB) {
    if (!inputElem || !inputElem.files || inputElem.files.length === 0) {
      alert("파일이 선택되지 않았습니다.");
      return false;
    }

    const file = inputElem.files[0];
    const fileName = file.name;

    // 확장자 체크
    if (!this.checkFileExtension(fileName)) {
      alert("해당 파일은 업로드할 수 없는 확장자입니다.");
      inputElem.value = ""; // 선택 초기화
      return false;
    }

    // 사이즈 체크
    if (maxSizeMB > 0 && !this.checkFileSize(file, maxSizeMB)) {
      alert(`업로드 파일 사이즈는 ${maxSizeMB}MB 이내로 가능합니다.`);
      inputElem.value = "";
      return false;
    }

    return true;
  }
};