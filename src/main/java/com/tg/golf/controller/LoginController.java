package com.tg.golf.controller;

import com.tg.golf.service.LoginService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Slf4j
@Controller
public class LoginController {

    @Autowired
    private LoginService loginService;

    @RequestMapping(value = "/goLogin")
    public String goLogin() {
        return "index";
    }

    @RequestMapping(value = "/goMain")
    public String goMain(){
        return "login/login";
    }


}
