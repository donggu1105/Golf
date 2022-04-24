package com.tg.golf.exception;

import lombok.NoArgsConstructor;
import org.springframework.validation.Errors;

public class UserNotExistException extends BaseException{

    private static final long serialVersionUID = -4480168635309435507L;

    public UserNotExistException() {
        super(ErrorCode.USER_NOT_FOUND);
    }


}
