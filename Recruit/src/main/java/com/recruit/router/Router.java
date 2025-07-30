package com.recruit.router;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

public class Router {

    private static Router instance;

    private final Map<String, Route> routeMap;

    private Router() {
        Map<String, Route> map = new HashMap<>();
        
        // 1. main용 라우터목록
        map.put("main"        , new Route("header", "/WEB-INF/jsp/main/main"         , "footer"));
        map.put("login"       , new Route("/WEB-INF/jsp/main/login"));        
        
        

        
        // 1-1. main 예외페이지 403,404, 405, 500, 기타예외
        map.put("forbidden"       , new Route("header", "/WEB-INF/jsp/error/forbidden"          , "footer"));
        map.put("notFoundPage"    , new Route("header", "/WEB-INF/jsp/error/not-found"          , "footer"));
        map.put("methodNotAllowed", new Route("header", "/WEB-INF/jsp/error/method-not-allowed" , "footer"));
        map.put("serverError"     , new Route("header", "/WEB-INF/jsp/error/server-error"       , "footer"));
        map.put("generalError"    , new Route("header", "/WEB-INF/jsp/error/general-error"      , "footer"));

        

        
        
        
        
        //2. iframe 라우터목록
        map.put("validation", new Route("/WEB-INF/jsp/iframe/sample/validation/validation"));
        map.put("popup"     , new Route("/WEB-INF/jsp/iframe/sample/popup/popup"));
        map.put("file"      , new Route("/WEB-INF/jsp/iframe/sample/file/file"));
        map.put("security"  , new Route("/WEB-INF/jsp/iframe/sample/security/security"));
        map.put("excel"     , new Route("/WEB-INF/jsp/iframe/sample/excel/excel"));
        map.put("sample"    , new Route("/WEB-INF/jsp/iframe/sample/sample/sample"));
        
        
        
        // 2-1. 추후에 iframe용 예외 페이지 만들어야함...!!
        
        
        
        
        
        
        //map.put("login", new Route("main/login"));
        //map.put("join" , new Route("main/join"));
        //map.put("redirect", new Route("redirect/redirect"));
        
        
        
        
        
        
        

        routeMap = Collections.unmodifiableMap(map);
    }

    public static synchronized Router getInstance() {
        if (instance == null) {
            instance = new Router();
        }
        return instance;
    }

    
    public Route getRoute(String key) {
        return routeMap.get(key);
    }
}
