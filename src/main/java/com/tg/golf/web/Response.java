package com.tg.golf.web;

import lombok.Builder;
import lombok.Getter;


@Builder
@Getter
public class Response {

    private Object data;
    private String status;
}
