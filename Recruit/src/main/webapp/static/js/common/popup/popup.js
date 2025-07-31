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

	// 기존 방식
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

		if (window.opener && window.opener.document) {
			this.receiveValue(finalValue, targetName);
		} else {
			console.warn("부모 창을 찾을 수 없습니다.");
		}

		window.close();
	},

	// postMessage 방식
	returnToParentPostMessage: function({ elementId = null, value = null, targetUrl = null, targetOrigin = "*" }) {
		if (!targetUrl) {
			console.warn("targetUrl은 필수입니다.");
			return;
		}

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

		const success = this.sendToParent(finalValue);
		if (success) {
			window.close();
		} else {
			console.warn("메시지 전송 실패로 팝업을 닫지 않습니다.");
		}
	},

	sendToParent: function(data) {
	    try {
	        if (window.opener && window.opener.postMessage) {
	            window.opener.postMessage(data, "*"); // 필요한 경우 origin 지정
	            return true;
	        } else {
	            console.warn("부모 창 또는 postMessage 함수가 없습니다.");
	            return false;
	        }
	    } catch (e) {
	        console.error("postMessage 전송 실패:", e);
	        return false;
	    }
	},



	receiveValue: function(value, name) {
		if (!window.opener || !window.opener.document) {
			console.warn("부모 창이 존재하지 않거나 접근 불가");
			return;
		}

		if (typeof value === 'object' && value !== null) {
			for (const key in value) {
				if (value.hasOwnProperty(key)) {
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