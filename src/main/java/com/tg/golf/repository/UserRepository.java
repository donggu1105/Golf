package com.tg.golf.repository;

import com.tg.golf.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    public Optional<User> findByMemIdAndPwd(String id, String pwd);

}
