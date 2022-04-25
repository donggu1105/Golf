package com.tg.golf.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.tg.golf.service.LoginService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Controller
public class LoginController {

    private final LoginService loginService;

    @RequestMapping(value = "/goLogin")
    public String goLogin() {
        return "join";
    }

    @RequestMapping(value = "/goMain")
    public String goMain(){
        return "login/login";
    }



}
