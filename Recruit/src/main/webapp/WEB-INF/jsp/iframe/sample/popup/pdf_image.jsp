<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <title>입사지원서</title>
  <style>
    /* 기존 스타일 그대로 사용 */
    body {
      font-family: "Noto Sans KR", sans-serif;
      padding: 0;
      margin: 0;
      background-color: #f9f9f9;
    }
    .container {
      width: 210mm;
      min-height: 297mm;
      margin: auto;
      padding: 30px;
      background-color: white;
      color: #000;
      box-sizing: border-box;
    }
    h1 {
      text-align: center;
      margin-bottom: 30px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
    }
    th, td {
      border: 1px solid #333;
      padding: 8px 12px;
      text-align: left;
      font-size: 14px;
    }
    th {
      background-color: #f1f1f1;
    }
    .section-title {
      margin: 40px 0 10px;
      font-size: 18px;
      font-weight: bold;
      border-bottom: 2px solid #333;
      padding-bottom: 5px;
      page-break-inside: avoid;
    }
    .photo {
      float: right;
      width: 120px;
      height: 150px;
      border: 1px solid #ccc;
      object-fit: cover;
    }
    .clearfix::after {
      content: "";
      display: block;
      clear: both;
    }
    .textarea {
      border: 1px solid #333;
      padding: 10px;
      min-height: 150px;
      white-space: pre-wrap;
      font-size: 14px;
      page-break-inside: auto;
    }
    .download-btn {
      position: fixed;
      top: 20px;
      right: 30px;
      background-color: #007bff;
      color: white;
      border: none;
      padding: 10px 15px;
      border-radius: 5px;
      cursor: pointer;
      font-size: 14px;
      z-index: 1000;
    }
    @media print {
      .download-btn {
        display: none;
      }
    }
  </style>
</head>
<body>

<!-- PDF 저장 버튼 -->
<button class="download-btn" onclick="downloadPdf()">PDF 저장</button>

<!-- 이력서 내용 -->
<div id="resume" class="container">
  <h1>입사지원서</h1>

  <div class="clearfix">
    <table>
      <tr>
        <th>이름</th>
        <td>홍길동</td>
        <th>생년월일</th>
        <td>1990-01-01</td>
      </tr>
      <tr>
        <th>연락처</th>
        <td>010-1234-5678</td>
        <th>이메일</th>
        <td>hong@example.com</td>
      </tr>
      <tr>
        <th>주소</th>
        <td colspan="3">서울특별시 강남구 테헤란로 123</td>
      </tr>
    </table>
    <img src="/static/images/user-photo.jpg" alt="사진" class="photo" />
  </div>

  <div class="section-title">학력사항</div>
  <table>
    <tr>
      <th>기간</th>
      <th>학교명</th>
      <th>전공</th>
      <th>졸업여부</th>
    </tr>
    <tr>
      <td>2008.03 - 2012.02</td>
      <td>OO대학교</td>
      <td>컴퓨터공학과</td>
      <td>졸업</td>
    </tr>
  </table>

  <div class="section-title">경력사항</div>
  <table>
    <tr>
      <th>근무기간</th>
      <th>회사명</th>
      <th>직무</th>
      <th>담당업무</th>
    </tr>
    <tr>
      <td>2012.03 - 2020.12</td>
      <td>ABC솔루션</td>
      <td>백엔드 개발자</td>
      <td>Java/Spring 기반 시스템 개발</td>
    </tr>
    <tr>
      <td>2021.01 - 현재</td>
      <td>XYZ테크</td>
      <td>시니어 개발자</td>
      <td>클라우드 기반 API 아키텍처 설계 및 운영</td>
    </tr>
  </table>

  <div class="section-title">자기소개</div>
  <div class="textarea">
안녕하세요. 저는 Java와 Spring Framework를 중심으로 백엔드 개발을 해온 8년 차 개발자입니다.    
다양한 프로젝트 경험을 통해 협업 능력과 문제 해결 능력을 키웠으며, 사용자 중심의 기능 구현에 관심이 많습니다.

최근에는 클라우드 기반 아키텍처 전환 및 도입 경험이 있으며, DevOps, CI/CD 파이프라인 설계에도 참여해왔습니다. 

앞으로도 끊임없이 배우고 성장하며, 문제 해결에 주도적으로 임하는 개발자가 되겠습니다.
  </div>
</div>

<!-- PDF 저장 스크립트 -->
<script src="/static/js/lib/html2pdf/html2pdf.bundle.min.js"></script>
<script>
  function downloadPdf() {
    const element = document.getElementById('resume');
    const opt = {
      margin: 0,
      filename: '입사지원서.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        scrollY: 0
      },
      jsPDF: {
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait'
      },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };
    html2pdf().set(opt).from(element).save();
  }
</script>

</body>
</html>