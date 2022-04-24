package com.tg.golf.controller;

import com.tg.golf.model.LoginDto;
import com.tg.golf.service.LoginService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;

@Controller
public class LoginController {
    private static final Logger log = LoggerFactory.getLogger(LoginController.class);
    @Autowired
    private LoginService loginService;

    @RequestMapping(value = "/goLogin")
    public String goLogin(Model model) {
        return "index";
    }

    @RequestMapping(value = "/goMain")
    public String goMain(){
        return "login/login";
    }

    @RequestMapping(value = "/confirmLogin" , method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> confirmLogin(@RequestBody LoginDto loginDto){
        Map<String,Object> jsonMap = new HashMap<>();
        jsonMap.put("resultCode","9999");
        int test = loginService.goLogin(loginDto.getMemId(),loginDto.getPwd());
        log.info(test+"");
        if (test == 1) {
            jsonMap.put("resultCode","0000");
        }
        return jsonMap;
    }
}
