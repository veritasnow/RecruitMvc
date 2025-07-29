<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<div id="containerIn">

    <form id="sampleForm">
        <div>
            <label for="id">아이디 (영문/숫자, 4~12자):</label>
            <input type="text" id="id" name="id" />
        </div>
        
        <div>
            <label for="name">닉네임 (1~12자):</label>
            <input type="text" id="name" name="name" />
        </div>

        <div>
            <label for="email">이메일:</label>
            <input type="text" id="email" name="email" />
        </div>

        <div>
            <label for="phone">휴대폰 번호 (예: 010-1234-5678):</label>
            <input type="text" id="phone" name="phone" />
        </div>

        <div>
            <label for="birthdate">생년월일 (YYYY-MM-DD):</label>
            <input type="text" id="birthdate" name="birthdate" />
        </div>

        <div>
            <label for="password">비밀번호 (영문 대소문자, 숫자, 특수문자 포함 8자 이상):</label>
            <input type="password" id="password" name="password" />
        </div>

        <button type="button" onclick="requestForm('I')">등록</button>        
        
        <button type="button" onclick="requestForm('U')">수정</button>
        
        <button type="button" onclick="requestForm('D')">삭제</button>        
    </form>

    <!-- JavaScript 로딩: JSP에서는 contextPath 사용 -->
    <script src="/static/js/common/validation.js" type="text/javascript"></script>

    <script type="text/javascript">
        function requestForm(type) {
            const id        = document.getElementById('id').value;
            const name      = document.getElementById('name').value;
            const email     = document.getElementById('email').value;
            const phone     = document.getElementById('phone').value;
            const birthdate = document.getElementById('birthdate').value;
            const password  = document.getElementById('password').value;

            if (validationUtil.isEmpty(id)) {
                alert('아이디를 입력하세요.');
                return;
            }
            if (!validationUtil.isAlphaNumeric(id)) {
                alert('아이디는 영문자와 숫자만 가능합니다.');
                return;
            }
            if (!validationUtil.hasLengthBetween(id, 4, 12)) {
                alert('아이디는 4자 이상 12자 이하이어야 합니다.');
                return;
            }
            
            if (validationUtil.isEmpty(name)) {
                alert('이름을 입력하세요.');
                return;
            }

            if (validationUtil.isEmpty(email)) {
                alert('이메일을 입력하세요.');
                return;
            }
            if (!validationUtil.isEmail(email)) {
                alert('유효한 이메일 주소를 입력하세요.');
                return;
            }

            if (validationUtil.isEmpty(phone)) {
                alert('휴대폰 번호를 입력하세요.');
                return;
            }
            if (!validationUtil.isPhoneNumber(phone)) {
                alert('유효한 휴대폰 번호를 입력하세요. 예: 010-1234-5678');
                return;
            }

            if (validationUtil.isEmpty(birthdate)) {
                alert('생년월일을 입력하세요.');
                return;
            }
            if (!validationUtil.isValidDate(birthdate)) {
                alert('유효한 날짜 형식으로 입력하세요. 예: 1990-01-01');
                return;
            }

            if (validationUtil.isEmpty(password)) {
                alert('비밀번호를 입력하세요.');
                return;
            }
            if (!validationUtil.isStrongPassword(password)) {
                alert('비밀번호는 영문 대문자, 소문자, 숫자, 특수문자를 포함한 8자 이상이어야 합니다.');
                return;
            }
            
            const data = {
            	id: id,
            	name: name,
            	email: email,
            	phone: phone,
            	birth: birthdate,
            	password: password
            };

            // 서버 전송 로직
            if (type == 'I') {
            	const test = restApi.save('/user/test', data)
				.then(function (data) {
					console.log(data);
				})
				.catch(function (error) {
					console.error('API 요청 실패:', error);
				});    
            } else if (type == 'U') {
            	const test = restApi.update('/user/test', data)
				.then(function (data) {
					console.log(data);
				})
				.catch(function (error) {
					console.error('API 요청 실패:', error);
				});    
            } else if (type == 'D') {
            	const test = restApi.delete('/user/test', data)
				.then(function (data) {
					console.log(data);
				})
				.catch(function (error) {
					console.error('API 요청 실패:', error);
				});    
            }
        }
    </script>

</div>