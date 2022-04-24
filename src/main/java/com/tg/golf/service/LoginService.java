package com.tg.golf.service;

import com.tg.golf.mapper.LoginMapper;
import com.tg.golf.model.LoginDto;
import org.springframework.stereotype.Service;

@Service
public class LoginService {
    LoginMapper loginMapper;
    public LoginService(LoginMapper loginMapper){
        this.loginMapper = loginMapper;
    }

    public int goLogin(String id,String pwd){
        return loginMapper.selectUser(id,pwd);
    }
}
