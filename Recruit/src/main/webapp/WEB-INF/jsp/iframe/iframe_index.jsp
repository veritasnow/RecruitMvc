<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">

<c:if test="${not empty _csrf}">
    <meta name="_csrf" content="${_csrf.token}" />
    <meta name="_csrf_header" content="${_csrf.headerName}" />
    <meta name="_csrf_parameter" content="${_csrf.parameterName}" />
</c:if>

<title>아이프레임 메인</title>

<!-- jQuery -->
<script src="/static/js/jquery/jquery-3.6.0.min.js"></script>

<!-- CSS -->
<link rel="shortcut icon" href="http://assets.tumblr.com/images/favicons/favicon.ico?1">
<link href="/static/css/notosanskr.css" rel="stylesheet">
<link href="/static/css/reset.css" rel="stylesheet">
<link href="/static/css/style.css" rel="stylesheet">

<!-- JS -->
<script src="/static/js/common/rest.js" type="text/javascript"></script>
<script src="/static/js/common/utils.js" type="text/javascript"></script>

<!-- Modal -->
<script src="/static/js/jquery/jquery.modal.min.js"></script>
<link rel="stylesheet" href="/static/css/jquery.modal.min.css" />
</head>

<body>
<div id="wrap">

    <c:if test="${not empty route.header}">
        <jsp:include page="../cmmn/header.jsp" />
    </c:if>

    <c:if test="${not empty route.container}">
        <jsp:include page="${route.container}.jsp" />
    </c:if>

    <c:if test="${not empty route.footer}">
        <jsp:include page="../cmmn/footer.jsp" />
    </c:if>

</div>
</body>
</html>