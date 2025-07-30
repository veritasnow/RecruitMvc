package com.recruit.cmmn.error;

import org.springframework.http.HttpStatus;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum CommonErrorCode implements ErrorCode {
	
	INVALID_PARAMETER(HttpStatus.BAD_REQUEST, "Invalid parameter included"),
    RESOURCE_NOT_FOUND(HttpStatus.NOT_FOUND, "Resource not exists"),
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error"),
    METHOD_NOT_ALLOWED(HttpStatus.METHOD_NOT_ALLOWED, "HTTP method not allowed."),
    
    // SQL 관련 에러
    SQL_DATA_ERROR(HttpStatus.BAD_REQUEST, "Invalid SQL data encountered."),
    BAD_SQL_GRAMMAR_ERROR(HttpStatus.BAD_REQUEST, "Bad SQL grammar error."),
    ;

    private final HttpStatus httpStatus;
    private final String message;
    
}
