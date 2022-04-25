package com.tg.golf.entity;

import cool.graph.cuid.Cuid;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Getter
@NoArgsConstructor @AllArgsConstructor
@Builder
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String memId;

    private String pwd;

    private String name;

    private String phone;

    private String email;

    private String cardNo;


    public static String generateCardNo() {
        return Cuid.createCuid();
    }

}
