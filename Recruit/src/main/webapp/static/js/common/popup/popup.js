const popupUtil = {
	openPopupGet: (url, params = {}, customOptions = {}) => {
		const defaultOptions = {
			width     : 600,
			height    : 500,
			top       : 100,
			left      : 100,
			scrollbars: 'yes',
			resizable : 'yes'
		};

		const options = Object.assign({}, defaultOptions, customOptions);

		let optionString = '';
		for (let key in options) {
			if (options.hasOwnProperty(key)) {
				optionString += `${key}=${options[key]},`;
			}
		}
		optionString = optionString.slice(0, -1);

		const queryString = new URLSearchParams(params).toString();
		const fullUrl = queryString ? `${url}?${queryString}` : url;

		window.open(fullUrl, '_blank', optionString);
	},
	
	returnToParent: function({ value = null, elementId = null }, targetName) {
		let finalValue = value;
		
		// ID로 전달된 경우 해당 element의 value를 가져옴
        if (elementId) {
        	const el = document.getElementById(elementId);
        	if (el) finalValue = el.value;
        }
        
        if (window.opener) {
            this.receiveValue(finalValue, targetName);
        }
        
        window.close();
	},
	
	receiveValue: function(value, name) {
        const obj = window.opener.document.getElementsByName(name)[0];
        if (obj) {
			obj.value = value;
		} else {
			console.warn(`name="${name}" 요소를 찾을 수 없습니다.`);
		}
    }
};