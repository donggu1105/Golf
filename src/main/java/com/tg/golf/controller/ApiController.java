package com.tg.golf.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tg.golf.exception.UserNotExistException;
import com.tg.golf.model.LoginDto;
import com.tg.golf.service.LoginService;
import com.tg.golf.web.Path;
import com.tg.golf.web.Response;
import com.tg.golf.web.ResponseStatus;

@RestController
public class ApiController {

	@Autowired
	LoginService loginService;

	@PostMapping(Path.CONFIRM_LOGIN)
	public Response confirmLogin(@RequestBody LoginDto loginDto) {

		if (!loginService.isUserExists(loginDto.getMemId(), loginDto.getPwd())) {
			throw new UserNotExistException();
		}

		return Response.builder().status(ResponseStatus.OK.getStatusCode()).build();
	}

}
