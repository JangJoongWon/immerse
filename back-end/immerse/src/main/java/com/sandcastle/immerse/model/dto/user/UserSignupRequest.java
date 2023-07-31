package com.sandcastle.immerse.model.dto.user;

import lombok.*;

import java.time.LocalDate;

@Data
public class UserSignupRequest {

    private String email;
    private String password;
    private String name;
    private String gender;
    private String nickname;
    private LocalDate birthday;
    private String phoneNumber;

}
