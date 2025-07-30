<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<div id="container">
	<div id="containerIn">
		excel 업로드 테스트
	
		<form id="excelUploadForm" enctype="multipart/form-data">
			<input type="file" id="excelFile" name="file" accept=".xlsx,.xls" />		
			<button type="button" onclick="uploadExcel()">업로드</button>	
		</form>
		
		<pre id="result"></pre>
	
		<script type="text/javascript">
			function uploadExcel() {
				const formData = new FormData();
				const fileInput = $("#excelFile")[0];
				
				if (!fileInput || !fileInput.files.length) {
					alert("파일을 선택해주세요.");
					return;
				}
				
				formData.append("file", fileInput.files[0]);
				
				$.ajax({
					url: "/excel/upload",
					type: "POST",
					data: formData,
					processData: false,
					contentType: false,
					success: function (res) {
						alert("✅ 업로드 성공: " + res.message);
						console.log("내용:", res.content);
						$("#result").text(JSON.stringify(res.content, null, 2));
					},
					error: function (xhr, status, error) {
						alert("❌ 업로드 실패: " + error);
					}
				});
			}
		</script>
	</div>
</div>
