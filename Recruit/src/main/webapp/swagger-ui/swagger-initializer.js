window.onload = function() {
  window.ui = SwaggerUIBundle({
    url: "/v2/api-docs",  // 또는 springdoc 사용 시 "/v3/api-docs"
    dom_id: '#swagger-ui',
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    layout: "StandaloneLayout"
  });
};