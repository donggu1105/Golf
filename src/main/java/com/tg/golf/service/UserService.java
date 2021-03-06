package com.tg.golf.service;

import com.tg.golf.entity.User;
import com.tg.golf.model.JoinDto;
import com.tg.golf.repository.UserRepository;
import jdk.nashorn.internal.runtime.options.Option;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;

    @Transactional
    public void join(JoinDto joinDto) {

        try {
            User user = User.builder()
                    .memId(joinDto.getMemId())
                    .pwd(joinDto.getPwd())
                    .name(joinDto.getName())
                    .phone(joinDto.getPhone())
                    .email(joinDto.getEmail())
                    .cardNo(User.generateCardNo())
                    .build();

            userRepository.save(user);
        } catch (Exception e) {
            log.error("회원가입시 예상치 못한 에러 발생!");
        }
    }

    public boolean isUserExists(String id, String pwd) {

        Optional<User> findUser = userRepository.findByMemIdAndPwd(id, pwd);

        if (!findUser.isPresent()) {
            return false;
        }
        return true;
    }
}
