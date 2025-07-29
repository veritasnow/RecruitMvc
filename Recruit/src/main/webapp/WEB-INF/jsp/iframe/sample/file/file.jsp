<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<div id="containerIn">
	<!-- 외부 JS 파일 로딩 -->
	<script src="/static/js/common/file.js" type="text/javascript"></script>

	파일 확장자 체크 테스트

	<form id="fileUploadForm" enctype="multipart/form-data">
		<input type="file" id="file" name="file" />		
		<button type="button" onclick="uploadFile()">업로드</button>	
	</form>
	
	<img alt="테스트 이미지" src="/upload/test1.jpg">
	
	<pre id="result"></pre>

	<script type="text/javascript">
		function uploadFile() {
			const formData = new FormData();
			const fileInput = $("#file")[0];
			
			if (!fileInput || !fileInput.files.length) {
				alert("파일을 선택해주세요.");
				return;
			}
			
			const file = fileInput.files[0];
			
			if (!fileUtil.checkFileExtension(file.name)) {
				alert("❌ 허용되지 않은 파일 형식입니다.\n허용된 확장자: " + fileUtil.allowedExtensions.join(', '));
				fileInput.value = ""; // 입력값 초기화
				return;
			}
			
			formData.append("file", file);
			
			restApi.fileUpload("/file/upload", formData)
				.done(function (res) {
					alert("✅ 업로드 성공: " + res.message);
					console.log("내용:", res.content);
				});
		}
	</script>
</div>
