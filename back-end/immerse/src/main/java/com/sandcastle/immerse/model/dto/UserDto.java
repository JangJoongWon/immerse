package com.sandcastle.immerse.model.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class UserDto {

    private Long userId;
    private String email;
    private String password;
    private String name;
    private String gender;
    private String nickname;
    private LocalDate birthday;
    private String phoneNumber;
    private String profilePicture;
    private String bannerPicture;
    private int point;
    private int status;
    private String selfDescription;

}
