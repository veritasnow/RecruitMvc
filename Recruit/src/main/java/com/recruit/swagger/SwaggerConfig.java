package com.recruit.swagger;

import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;


import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger.web.OperationsSorter;
import springfox.documentation.swagger.web.UiConfiguration;
import springfox.documentation.swagger.web.UiConfigurationBuilder;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@EnableSwagger2
@EnableWebMvc
public class SwaggerConfig {  

    @Bean
    public Docket api(){
        return new Docket(DocumentationType.SWAGGER_2)
                .select()
				// 자기 프로젝트에 맞게 설정!
                .apis(RequestHandlerSelectors.basePackage("com.recruit"))
                .paths(PathSelectors.any())
                // .paths(PathSelectors.regex("(?!/error.*).*"))
                .build()
                .pathMapping("/")
                .useDefaultResponseMessages(false)
                .apiInfo(apiInfo());
    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("SAMPLE-API")
                .description("샘플 API 입니다.")
                .termsOfServiceUrl("coding.toast.co.kr/api/")
                .version("1.0.0")
                .build();
    }

    @Bean
    public UiConfiguration uiconfig() {
        return UiConfigurationBuilder
                .builder().operationsSorter(OperationsSorter.ALPHA)
                .build();
    }
}
