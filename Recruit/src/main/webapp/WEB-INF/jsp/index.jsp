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
<link href="/static/css/reset.css"           rel="stylesheet">
<link href="/static/css/main/style.css"      rel="stylesheet">
<link href="/static/css/main/login.css"      rel="stylesheet">
<link href="/static/css/main/sidebar.css"    rel="stylesheet">


<!-- js -->
<script src="/static/js/common/rest.js" type="text/javascript"></script>		

<!-- modal -->
<script src="/static/js/jquery/jquery.modal.min.js"></script>
<link rel="stylesheet" href="/static/css/jquery.modal.min.css" />

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