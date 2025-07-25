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
        map.put("main"      , new Route("header", "/WEB-INF/jsp/main/main", "footer"));
        map.put("security"  , new Route("header", "/WEB-INF/jsp/security/security", "footer"));
        map.put("pdf"       , new Route("header", "/WEB-INF/jsp/sample/pdf/pdf", "footer"));
        map.put("excel"     , new Route("header", "/WEB-INF/jsp/sample/excel/excel", "footer"));
        map.put("file"      , new Route("header", "/WEB-INF/jsp/sample/file/file", "footer"));
                

        

        
        
        
        
        //2. iframe 라우터목록
        map.put("validation", new Route("/WEB-INF/jsp/iframe/sample/validation/validation"));
        map.put("popup"     , new Route("/WEB-INF/jsp/iframe/sample/popup/popup"));
        
        
        
        
        
        //map.put("login", new Route("main/login"));
        //map.put("join" , new Route("main/join"));
        //map.put("redirect", new Route("redirect/redirect"));
        
        
        
        map.put("notFoundPage", new Route("header", "/WEB-INF/jsp/error/notFoundPage", "footer"));

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
