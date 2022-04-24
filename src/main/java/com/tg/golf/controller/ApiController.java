package com.tg.golf.controller;

import com.tg.golf.web.Response;
import com.tg.golf.web.ResponseStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ApiController {


    @GetMapping("/")
    public Response test() {


        return Response.builder()
                .status(ResponseStatus.OK.getStatusCode())
                .data("test")
                .build();

    }

}
