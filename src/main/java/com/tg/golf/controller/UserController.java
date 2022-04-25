package com.tg.golf.controller;

import com.tg.golf.exception.InvalidParameterException;
import com.tg.golf.exception.UserNotExistException;
import com.tg.golf.model.JoinDto;
import com.tg.golf.model.LoginDto;
import com.tg.golf.service.UserService;
import com.tg.golf.web.Path;
import com.tg.golf.web.Response;
import com.tg.golf.web.ResponseStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequiredArgsConstructor
@Controller
public class UserController {

    private final UserService userService;

    // 로그인
    @GetMapping(Path.LOGIN)
    public String loginView() {
        return "user/login";
    }

    @PostMapping(Path.LOGIN)
    @ResponseBody
    public Response login(@RequestBody LoginDto loginDto) {

        if (!userService.isUserExists(loginDto.getMemId(), loginDto.getPwd())) {
            throw new UserNotExistException();
        }

        return Response.builder().status(ResponseStatus.OK.getStatusCode()).build();
    }
    // 회원 가입 페이지
    @GetMapping(Path.JOIN)
    public String joinView() {
        return "user/join";
    }

    // 회원 가입
    @PostMapping(Path.JOIN)
    @ResponseBody
    public Response join(@RequestBody JoinDto joinDto, BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            throw new InvalidParameterException(bindingResult);
        }
        userService.join(joinDto);

        return Response.builder().status(ResponseStatus.OK.getStatusCode()).build();
    }
}
