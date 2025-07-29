<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">

<c:if test="${_csrf != null}">
  <meta name="_csrf" content="${_csrf.token}"/>
  <meta name="_csrf_header" content="${_csrf.headerName}"/>
  <meta name="_csrf_parameter" content="${_csrf.parameterName}"/>
</c:if>

<title>테스트</title>
<script src="/static/js/jquery/jquery-3.6.0.min.js"></script>

<!-- css -->
<link rel="shortcut icon" href="http://assets.tumblr.com/images/favicons/favicon.ico?1">
<link href="/static/css/notosanskr.css" rel="stylesheet">
<link href="/static/css/reset.css"      rel="stylesheet">
<link href="/static/css/style.css"      rel="stylesheet">

<!-- js -->
<script src="/static/js/common/rest.js" type="text/javascript"></script>		

<!-- modal -->
<script src="/static/js/jquery/jquery.modal.min.js"></script>
<link rel="stylesheet" href="/static/css/jquery.modal.min.css" />

<style>
  /* 사이드바 */
  #sidebar {
    position: fixed;
    top: 0; left: 0;
    width: 200px;
    height: 100vh;
    background-color: #343a40;
    color: white;
    overflow-y: auto;
  }
  #sidebar h5 {
    margin: 0; padding: 16px 0; text-align: center;
    font-weight: bold;
    border-bottom: 1px solid #495057;
  }
  #sidebar ul {
    list-style: none;
    padding-left: 0;
    margin: 0;
  }
  #sidebar li {
    padding: 12px 20px;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }
  #sidebar li:hover {
    background-color: #495057;
  }

  /* 메인 영역 */
  #main {
    margin-left: 200px;
    height: 100vh;
    display: flex;
    flex-direction: column;
  }

  /* 탭바 */
  #tab-bar {
    background-color: #fff;
    border-bottom: 1px solid #dee2e6;
    display: flex;
    align-items: center;
    overflow: hidden;
    height: 42px;
    user-select: none;
  }
  #tabs {
    display: flex;
    overflow-x: auto;
    flex-grow: 1;
    scrollbar-width: none; /* Firefox */
  }
  #tabs::-webkit-scrollbar {
    display: none; /* Chrome, Safari */
  }
  .tab {
    padding: 8px 16px;
    white-space: nowrap;
    cursor: pointer;
    border: 1px solid transparent;
    border-bottom: none;
    margin-right: 2px;
    position: relative;
    background-color: #e9ecef;
    font-size: 14px;
    color: #495057;
    transition: background-color 0.2s ease;
  }
  .tab:hover {
    background-color: #ced4da;
  }
  .tab.active {
    background-color: #fff;
    border-color: #dee2e6 #dee2e6 white;
    font-weight: 600;
    color: #212529;
  }
  .tab .close-btn {
    position: absolute;
    top: 4px;
    right: 6px;
    font-weight: bold;
    cursor: pointer;
    color: #6c757d;
  }
  .tab .close-btn:hover {
    color: #dc3545;
  }

  /* iframe 영역 */
  #iframe-container {
    flex-grow: 1;
    background-color: white;
  }
  iframe {
    width: 100%;
    height: 100%;
    border: none;
    display: none;
  }

  /* 좌우 스크롤 버튼 */
  #scroll-left, #scroll-right {
    padding: 0 10px;
    cursor: pointer;
    color: #495057;
    user-select: none;
    font-weight: bold;
    font-size: 18px;
    user-select: none;
  }
  #scroll-left:hover, #scroll-right:hover {
    color: #212529;
  }
</style>
</head>

<body>
<div id="wrap">

    <c:if test="${route.footer != null}">
        <jsp:include page="/WEB-INF/jsp/cmmn/header.jsp" />
    </c:if>
    
    <jsp:include page="${route.container}.jsp" />

    <c:if test="${route.footer != null}">
        <jsp:include page="/WEB-INF/jsp/cmmn/footer.jsp" />
    </c:if>

</div>
</body>
</html>