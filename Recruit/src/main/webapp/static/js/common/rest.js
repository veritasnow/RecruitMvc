const restApi = {
	// 내부 토큰 보관용
	token: {
		csrfToken: null,
		csrfHeader: null,
		authToken: null
	},

	// 초기 토큰 자동 설정 (Spring Security CSRF + Session JWT 등)
	initToken: function () {
		var metaCsrf = document.querySelector('meta[name="_csrf"]');
		var metaHeader = document.querySelector('meta[name="_csrf_header"]');

		this.token.csrfToken = metaCsrf ? metaCsrf.content : null;
		this.token.csrfHeader = metaHeader ? metaHeader.content : null;
		this.token.authToken = sessionStorage.getItem('ACCESS_TOKEN'); // JWT 등 저장된 경우
	},

	// 수동 설정도 가능
	setToken: function (options) {
		if (options.csrfToken) this.token.csrfToken = options.csrfToken;
		if (options.csrfHeader) this.token.csrfHeader = options.csrfHeader;
		if (options.authToken) this.token.authToken = options.authToken;
	},

	request: function (method, urlLink, data) {
		if (!this.token.csrfToken || !this.token.csrfHeader) {
			this.initToken();
		}

		if (method === 'GET' && data) {
			var queryString = Object.keys(data)
				.map(function (key) {
					return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
				})
				.join('&');
			urlLink += (urlLink.indexOf('?') !== -1 ? '&' : '?') + queryString;
			data = null; // GET은 body 없음
		}

		var headers = {};
		if (this.token.csrfToken && this.token.csrfHeader) {
			headers[this.token.csrfHeader] = this.token.csrfToken;
		}
		if (this.token.authToken) {
			headers['Authorization'] = 'Bearer ' + this.token.authToken;
		}

		return $.ajax({
			type: method,
			url: urlLink,
			dataType: 'json',
			contentType: 'application/json; charset=utf-8',
			headers: headers,
			data: data ? JSON.stringify(data) : null
		}).fail(function (jqXHR) {
			var message = jqXHR.responseText || '알 수 없는 에러가 발생했습니다.';
			try {
				var res = JSON.parse(jqXHR.responseText);
				if (res.message) message = res.message;
			} catch (e) {}
			alert('API 요청 실패: ' + message);
		});
	},

	read: function (urlLink, data) {
		return this.request('GET', urlLink, data);
	},

	save: function (urlLink, data) {
		return this.request('POST', urlLink, data);
	},

	update: function (urlLink, data) {
		return this.request('PUT', urlLink, data);
	},

	delete: function (urlLink, data) {
		return this.request('DELETE', urlLink, data);
	},

	fileUpload: function (urlLink, formData) {
		if (!this.token.csrfToken || !this.token.csrfHeader) {
			this.initToken();
		}

		var headers = {};
		if (this.token.csrfToken && this.token.csrfHeader) {
			headers[this.token.csrfHeader] = this.token.csrfToken;
		}
		if (this.token.authToken) {
			headers['Authorization'] = 'Bearer ' + this.token.authToken;
		}
		
		return $.ajax({
			type: 'POST',
			url: urlLink,
			contentType: false,
			processData: false,
			headers: headers,
			data: formData
		}).fail(function (jqXHR) {
			var message = jqXHR.responseText || '알 수 없는 에러가 발생했습니다.';
			try {
				var res = JSON.parse(jqXHR.responseText);
				if (res.message) message = res.message;
			} catch (e) {}
			alert('파일 업로드 실패: ' + message);
		});
	}
};

// 페이지 최초 실행 시 자동 토큰 세팅
restApi.initToken();