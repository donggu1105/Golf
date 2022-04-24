package com.tg.golf.web;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Getter
public enum ResponseStatus {

    OK ("0000", "정상");

    private String statusCode;
    private String description;

    ResponseStatus(String statusCode, String description) {
        this.statusCode = statusCode;
        this.description = description;
    }
}
