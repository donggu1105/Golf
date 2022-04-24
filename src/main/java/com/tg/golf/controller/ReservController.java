package com.tg.golf.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.tg.golf.service.ReservService;

@Controller
public class ReservController {
	
	@Autowired
	private ReservService reservService;

	@RequestMapping(value = "/main")
	public String goLogin(Model model) {
		model.addAttribute("fieldDto",reservService.getFieldList());
		return "main/main";
	}
}
