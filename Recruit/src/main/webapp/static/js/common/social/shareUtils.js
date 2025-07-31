const shareModule = {
  shareUrl: '',
  shareTitle: '',
  shareContent: '',

  init(btnShareId, modalId, btnCloseId, shareButtonsId) {
    this.btnShare = document.getElementById(btnShareId);
    this.modal = document.getElementById(modalId);
    this.btnClose = document.getElementById(btnCloseId);
    this.shareButtonsContainer = document.getElementById(shareButtonsId);

    // 이벤트 바인딩
    this.btnShare.addEventListener('click', () => this.openModal());
    this.btnClose.addEventListener('click', () => this.closeModal());
  },

  setShareData(url, title, content) {
    this.shareUrl = url;
    this.shareTitle = title;
    this.shareContent = content;
    this.createShareButtons();
  },

  openModal() {
    if (!this.shareUrl) {
      alert('공유할 URL이 설정되지 않았습니다.');
      return;
    }
    this.modal.style.display = 'block';
  },

  closeModal() {
    this.modal.style.display = 'none';
  },

  createShareButtons() {
    this.shareButtonsContainer.innerHTML = ''; // 초기화

    const encodedUrl = encodeURIComponent(this.shareUrl);
    const encodedTitle = encodeURIComponent(this.shareTitle);
    const encodedContent = encodeURIComponent(this.shareContent);

    const snsList = [
      { name: '페이스북', url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}` },
      { name: '트위터', url: `https://twitter.com/intent/tweet?text=${encodedTitle}%20${encodedContent}&url=${encodedUrl}` },
      { name: '네이버 밴드', url: `http://band.us/plugin/share?body=${encodedTitle}%20${encodedContent}&route=${encodedUrl}` },
      { name: '카카오톡 (복사)', url: '' }
    ];

    snsList.forEach(sns => {
      const btn = document.createElement('button');
      btn.textContent = sns.name;
      btn.style.cursor = 'pointer';
      btn.addEventListener('click', () => {
        if (sns.name === '카카오톡 (복사)') {
          navigator.clipboard.writeText(this.shareUrl).then(() => {
            alert('링크가 복사되었습니다. 카카오톡에 붙여넣기 해주세요!');
          }).catch(() => {
            alert('복사 실패! 수동으로 링크를 복사하세요:\n' + this.shareUrl);
          });
        } else {
          window.open(sns.url, '_blank', 'width=600,height=400');
        }
      });
      this.shareButtonsContainer.appendChild(btn);
    });
  }
};