package com.tg.golf.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.tg.golf.mapper.ReservMapper;
import com.tg.golf.model.ReservDto;

@Service
public class ReservService {

	ReservMapper reservMapper;

	public ReservService(ReservMapper reservMapper) {
		this.reservMapper = reservMapper;
	}
	public List<ReservDto> getFieldList(){

     return reservMapper.selectField();
	}
}
