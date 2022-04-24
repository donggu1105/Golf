package com.tg.golf.model;

import lombok.Data;

@Data
public class LoginDto {
    private String memId;
    private String pwd;
    private String name;
    private String phone;
    private String email;
    private String cardNo;
}
