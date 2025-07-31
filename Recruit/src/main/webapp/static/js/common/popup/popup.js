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
	
	    if (elementId) {
	        if (Array.isArray(elementId)) {
	            finalValue = {};
	            elementId.forEach(id => {
	                const el = document.getElementById(id);
	                if (el) finalValue[id] = el.value;
	            });
	        } else {
	            const el = document.getElementById(elementId);
	            if (el) finalValue = el.value;
	        }
	    }
	
	    if (window.opener) {
	        this.receiveValue(finalValue, targetName);
	    }
	
	    window.close();
	},
	
	receiveValue: function(value, name) {
	    if (typeof value === 'object' && value !== null) {
	        for (const key in value) {
	            if (value.hasOwnProperty(key)) {
	                // id 우선 찾고 없으면 name으로 찾기
	                let obj = window.opener.document.getElementById(key);
	                if (!obj) {
	                    obj = window.opener.document.getElementsByName(key)[0];
	                }
	
	                if (obj) {
	                    obj.value = value[key];
	                } else {
	                    console.warn(`id 또는 name="${key}" 요소를 찾을 수 없습니다.`);
	                }
	            }
	        }
	    } else {
	        const obj = window.opener.document.getElementsByName(name)[0];
	        if (obj) {
	            obj.value = value;
	        } else {
	            console.warn(`name="${name}" 요소를 찾을 수 없습니다.`);
	        }
	    }
	}
};