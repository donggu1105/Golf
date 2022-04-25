package com.tg.golf.exception;

import lombok.Getter;
import org.springframework.validation.Errors;

@Getter
public class InvalidParameterException extends BaseException {

    private static final long serialVersionUID = -4480168635309435507L;

    private final Errors errors;

    public InvalidParameterException(Errors errors) {
        super(ErrorCode.INVALID_PARAMETER);
        this.errors = errors;
    }

}
