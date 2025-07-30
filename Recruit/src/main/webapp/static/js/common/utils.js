const selectUtils = {
  /**
   * select 박스 초기화 후 데이터 밀어넣기
   * @param {HTMLSelectElement} selectElem 
   * @param {Array<Object>} data - 배열 객체
   * @param {string} nameKey - 옵션 텍스트 키
   * @param {string} valueKey - 옵션 value 키
   * @param {string} [defaultValue] - 기본 선택값
   * @param {string} [placeholder] - 첫번째 빈 옵션 텍스트
   */
  setSelect: function(selectElem, data, nameKey, valueKey, defaultValue, placeholder) {
    if (!selectElem || !Array.isArray(data)) return;

    selectElem.innerHTML = '';

    if (placeholder) {
      const option = document.createElement('option');
      option.text = placeholder;
      option.value = '';
      option.disabled = true;
      option.selected = !defaultValue;
      selectElem.add(option);
    }

    data.forEach(item => {
      const option = document.createElement('option');
      option.text = item[nameKey] || '';
      option.value = item[valueKey] || '';
      selectElem.add(option);
    });

    if (defaultValue !== undefined) {
      selectElem.value = defaultValue;
    }
  },

  /**
   * select 박스 옵션 전체 삭제
   * @param {HTMLSelectElement} selectElem 
   */
  clearSelect: function(selectElem) {
    if (!selectElem) return;
    selectElem.innerHTML = '';
  },

  /**
   * select 박스에 옵션 1개 추가
   * @param {HTMLSelectElement} selectElem 
   * @param {string} text 
   * @param {string} value 
   */
  addOption: function(selectElem, text, value) {
    if (!selectElem) return;

    const option = document.createElement('option');
    option.text = text;
    option.value = value;
    selectElem.add(option);
  },

  /**
   * select 박스 기본값 설정
   * @param {HTMLSelectElement} selectElem 
   * @param {string} value 
   */
  setDefaultValue: function(selectElem, value) {
    if (!selectElem) return;
    selectElem.value = value;
  },

  /**
   * select 박스에서 선택된 값(value) 반환
   * @param {HTMLSelectElement} selectElem 
   * @returns {string|null} 선택된 value 값, 없으면 null
   */
  getSelectedValue: function(selectElem) {
    if (!selectElem) return null;
    return selectElem.value;
  },

  /**
   * select 박스에 있는 모든 옵션을 배열로 반환
   * @param {HTMLSelectElement} selectElem 
   * @returns {Array<{text:string, value:string}>}
   */
  getAllOptions: function(selectElem) {
    if (!selectElem) return [];
    return Array.from(selectElem.options).map(opt => ({ text: opt.text, value: opt.value }));
  }
};



const radioUtils = {
  /**
   * 라디오 버튼 그룹 세팅
   * @param {HTMLElement} container 
   * @param {Array<Object>} data 
   * @param {string} name 
   * @param {string} labelKey 
   * @param {string} valueKey 
   * @param {string} [defaultValue] 
   */
  setRadioGroup: function(container, data, name, labelKey, valueKey, defaultValue) {
    if (!container || !Array.isArray(data)) return;
    container.innerHTML = '';

    data.forEach(item => {
      const id = `${name}_${item[valueKey]}`;

      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = name;
      radio.id = id;
      radio.value = item[valueKey];
      if (item[valueKey] === defaultValue) {
        radio.checked = true;
      }

      const label = document.createElement('label');
      label.htmlFor = id;
      label.textContent = item[labelKey];

      container.appendChild(radio);
      container.appendChild(label);
    });
  },

  /**
   * 선택된 라디오 값 가져오기
   * @param {string} name 
   * @returns {string|null}
   */
  getSelectedValue: function(name) {
    const selected = document.querySelector(`input[name="${name}"]:checked`);
    return selected ? selected.value : null;
  },

  /**
   * 라디오 그룹에서 특정 값 선택
   * @param {string} name 
   * @param {string} value 
   */
  setSelectedValue: function(name, value) {
    const radios = document.querySelectorAll(`input[name="${name}"]`);
    radios.forEach(radio => {
      radio.checked = radio.value === value;
    });
  }
};