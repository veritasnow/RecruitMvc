const restApi = {
	/**
	 * 내부에서 사용할 보안 토큰 저장용 객체
	 * @property {string|null} csrfToken - CSRF 토큰
	 * @property {string|null} csrfHeader - CSRF 헤더 이름
	 * @property {string|null} authToken - 인증 토큰 (예: JWT)
	 */
	token: {
		csrfToken: null,
		csrfHeader: null,
		authToken: null
	},

	/**
	 * meta 태그를 통해 초기 CSRF 토큰 및 인증 토큰 설정
	 * Spring Security 환경 기준으로 동작
	 */
	initToken: function () {
		let metaCsrf = document.querySelector('meta[name="_csrf"]');
		let metaHeader = document.querySelector('meta[name="_csrf_header"]');

		this.token.csrfToken = metaCsrf ? metaCsrf.content : null;
		this.token.csrfHeader = metaHeader ? metaHeader.content : null;
		this.token.authToken = sessionStorage.getItem('ACCESS_TOKEN');
	},

	/**
	 * 토큰을 수동으로 설정할 수 있음
	 * @param {Object} options
	 * @param {string} [options.csrfToken] - CSRF 토큰
	 * @param {string} [options.csrfHeader] - CSRF 헤더 이름
	 * @param {string} [options.authToken] - 인증 토큰
	 */
	setToken: function (options) {
		if (options.csrfToken) this.token.csrfToken = options.csrfToken;
		if (options.csrfHeader) this.token.csrfHeader = options.csrfHeader;
		if (options.authToken) this.token.authToken = options.authToken;
	},

	/**
	 * 공통 Ajax 요청 처리 함수
	 * @param {string} method - HTTP 메서드 (GET, POST, PUT, DELETE 등)
	 * @param {string} urlLink - 요청 URL
	 * @param {Object|null} [data] - 요청 데이터 (GET은 쿼리스트링 처리)
	 * @returns {jqXHR} jQuery Ajax 객체 (Promise-like)
	 */
	request: function (method, urlLink, data, timeout) {
	    if (!this.token.csrfToken || !this.token.csrfHeader) {
	        this.initToken();
	    }
	
	    // GET 요청일 경우 쿼리스트링으로 변환
	    if (method === 'GET' && data) {
	        let queryString = Object.keys(data)
	            .map(function (key) {
	                return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
	            })
	            .join('&');
	        urlLink += (urlLink.indexOf('?') !== -1 ? '&' : '?') + queryString;
	        data = null;
	    }
	
	    let headers = {};
	    if (this.token.csrfToken && this.token.csrfHeader) {
	        headers[this.token.csrfHeader] = this.token.csrfToken;
	    }
	    if (this.token.authToken) {
	        headers['Authorization'] = 'Bearer ' + this.token.authToken;
	    }
	
	    const ajaxOptions = {
	        type: method,
	        url: urlLink,
	        dataType: 'json',
	        contentType: 'application/json; charset=utf-8',
	        headers: headers,
	        data: data ? JSON.stringify(data) : null
	    };
	
	    // timeout 값이 있으면 옵션에 추가
	    if (timeout !== undefined) {
	        ajaxOptions.timeout = timeout;
	    }
	
	    return $.ajax(ajaxOptions).fail(function (jqXHR) {
	        let message = jqXHR.responseText || '알 수 없는 에러가 발생했습니다.';
	        try {
	            let res = JSON.parse(jqXHR.responseText);
	            if (res.message) message = res.message;
	        } catch (e) {}
	        alert('API 요청 실패: ' + message);
	    });
	},

	/**
	 * GET 방식으로 데이터 조회
	 * @param {string} urlLink - 요청 URL
	 * @param {Object} [data] - 쿼리 파라미터
	 * @returns {jqXHR}
	 */
	read: function (urlLink, data) {
		return this.request('GET', urlLink, data);
	},

	/**
	 * POST 방식으로 데이터 저장
	 * @param {string} urlLink - 요청 URL
	 * @param {Object} data - 전송할 데이터
	 * @returns {jqXHR}
	 */
	save: function (urlLink, data) {
		return this.request('POST', urlLink, data);
	},

	/**
	 * PUT 방식으로 데이터 수정
	 * @param {string} urlLink - 요청 URL
	 * @param {Object} data - 수정할 데이터
	 * @returns {jqXHR}
	 */
	update: function (urlLink, data) {
		return this.request('PUT', urlLink, data);
	},

	/**
	 * DELETE 방식으로 데이터 삭제
	 * @param {string} urlLink - 요청 URL
	 * @param {Object} [data] - 삭제할 데이터
	 * @returns {jqXHR}
	 */
	delete: function (urlLink, data) {
		return this.request('DELETE', urlLink, data);
	},

	/**
	 * 파일 업로드 처리 (FormData 사용)
	 * @param {string} urlLink - 업로드할 URL
	 * @param {FormData} formData - 파일이 포함된 FormData 객체
	 * @returns {jqXHR}
	 */
	fileUpload: function (urlLink, formData) {
		if (!this.token.csrfToken || !this.token.csrfHeader) {
			this.initToken();
		}

		let headers = {};
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
			let message = jqXHR.responseText || '파일 업로드 중 오류가 발생했습니다.';
			try {
				let res = JSON.parse(jqXHR.responseText);
				if (res.message) message = res.message;
			} catch (e) {}
			alert('파일 업로드 실패: ' + message);
		});
	}
};

// 페이지 로드 시 토큰 초기화
restApi.initToken();