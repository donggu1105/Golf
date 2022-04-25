package com.tg.golf.controller;

import com.tg.golf.exception.InvalidParameterException;
import com.tg.golf.model.JoinDto;
import com.tg.golf.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Slf4j
@RequiredArgsConstructor
@Controller
public class UserController {

    private final UserService userService;

    // 로그인

    // 회원 가입 페이지
    @GetMapping("/join")
    public String joinView() {
        return "/user/join";
    }

    // 회원 가입
    @PostMapping("/join")
    public String join(@RequestBody JoinDto joinDto, BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            throw new InvalidParameterException(bindingResult);
        }
        userService.join(joinDto);

        return "/main/main";
    }
}
