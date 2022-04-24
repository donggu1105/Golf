package com.tg.golf.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.tg.golf.model.ReservDto;

@Mapper
public interface ReservMapper {
    List<ReservDto> selectField();
}
