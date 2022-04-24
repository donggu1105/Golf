package com.tg.golf.web;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;


@Builder
@Getter
public class Response {

    private Object data;
    private String status;




}
