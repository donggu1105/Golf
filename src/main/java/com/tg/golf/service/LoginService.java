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

    public boolean isUserExists(String id,String pwd){

        int count = loginMapper.selectUser(id, pwd);

        if (count > 0) {
            return true;
        }
        return false;
    }
}
