package com.tg.golf.model;

import com.tg.golf.entity.User;
import lombok.Builder;
import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class JoinDto {

    @NotNull
    private String memId;
    @NotNull
    private String pwd;
    @NotNull
    private String name;

    private String phone;

    private String email;

    private String cardNo;

}
