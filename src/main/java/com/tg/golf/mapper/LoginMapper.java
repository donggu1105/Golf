package com.tg.golf.mapper;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface LoginMapper {
    int selectUser(String id,String pwd);
}
