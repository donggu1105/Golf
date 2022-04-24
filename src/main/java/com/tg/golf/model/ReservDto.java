package com.tg.golf.model;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class ReservDto {
	private int rangeCode;
	private int tsNumber;
 	private LocalDateTime remainTime;
}
