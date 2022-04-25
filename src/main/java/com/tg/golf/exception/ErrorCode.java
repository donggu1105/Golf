package com.tg.golf.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {

    INVALID_PARAMETER(9999, null, "Invalid Request Data"),
    ERROR(9999, null, "error"),
    USER_NOT_FOUND(9999, null, "user not found");

    private final int status;
    private final String code;
    private final String message;
}
