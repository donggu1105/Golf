package com.tg.golf.exception;

public class BaseException extends RuntimeException{


    private static final long serialVersionUID = -7224586031061421968L;

    private ErrorCode errorCode;

    public BaseException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }

    public ErrorCode getErrorCode() {
        return errorCode;
    }

}
