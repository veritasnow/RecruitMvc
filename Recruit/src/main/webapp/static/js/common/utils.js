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
  },
  
  /**
   * select 요소 읽기전용 설정 (disabled와 구분)
   * readonly 상태면 클릭, 변경 못 하도록 막음
   * @param {HTMLSelectElement} selectElem
   * @param {boolean} isReadonly
   */
  setReadonly: function(selectElem, isReadonly) {
    if (!selectElem) return;

    if (isReadonly) {
      // 클릭/변경 이벤트 막기
      selectElem.addEventListener('mousedown', preventEvent);
      selectElem.addEventListener('keydown', preventEvent);
      selectElem.style.pointerEvents = 'none';  // 클릭 막기 (보조)
      selectElem.style.backgroundColor = '#eee'; // 읽기전용 느낌 스타일
    } else {
      selectElem.removeEventListener('mousedown', preventEvent);
      selectElem.removeEventListener('keydown', preventEvent);
      selectElem.style.pointerEvents = '';
      selectElem.style.backgroundColor = '';
    }
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
  },
  
  /**
   * 라디오 버튼 그룹 읽기전용 설정 (disabled와 구분)
   * 클릭 및 변경 못 하게 막음
   * @param {string} name - 라디오 그룹 name
   * @param {boolean} isReadonly
   */
  setReadonly: function(name, isReadonly) {
    const radios = document.querySelectorAll(`input[name="${name}"]`);
    radios.forEach(radio => {
      if (isReadonly) {
        // 클릭 이벤트 차단
        radio.addEventListener('click', preventEventRadio);
        radio.style.cursor = 'not-allowed';
      } else {
        radio.removeEventListener('click', preventEventRadio);
        radio.style.cursor = '';
      }
    });
  }  
};



const inputUtils = {
  /**
   * input 요소에 여러 속성을 세팅 (id, name, value, type, placeholder 등)
   * @param {HTMLInputElement} inputElem
   * @param {Object} props - { id, name, value, type, placeholder, readonly, disabled }
   */
  setInput: function(inputElem, props) {
    if (!inputElem || typeof props !== 'object') return;
    
    if (props.id !== undefined) inputElem.id = props.id;
    if (props.name !== undefined) inputElem.name = props.name;
    if (props.type !== undefined) inputElem.type = props.type;
    if (props.value !== undefined) inputElem.value = props.value;
    if (props.placeholder !== undefined) inputElem.placeholder = props.placeholder;
    if (props.readonly !== undefined) inputElem.readOnly = Boolean(props.readonly);
    if (props.disabled !== undefined) inputElem.disabled = Boolean(props.disabled);
  },

  /**
   * input 요소의 현재 값을 반환
   * @param {HTMLInputElement} inputElem
   * @returns {string|null}
   */
  getValue: function(inputElem) {
    if (!inputElem) return null;
    return inputElem.value;
  },

  /**
   * input 요소 값(value) 설정
   * @param {HTMLInputElement} inputElem
   * @param {string} value
   */
  setValue: function(inputElem, value) {
    if (!inputElem) return;
    inputElem.value = value;
  },

  /**
   * input 요소 읽기전용 속성 설정/해제
   * @param {HTMLInputElement} inputElem
   * @param {boolean} isReadonly
   */
  setReadonly: function(inputElem, isReadonly) {
    if (!inputElem) return;
    inputElem.readOnly = Boolean(isReadonly);
  },

  /**
   * input 요소 disabled 속성 설정/해제
   * @param {HTMLInputElement} inputElem
   * @param {boolean} isDisabled
   */
  setDisabled: function(inputElem, isDisabled) {
    if (!inputElem) return;
    inputElem.disabled = Boolean(isDisabled);
  }
};