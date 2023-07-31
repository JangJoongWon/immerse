package com.sandcastle.immerse.model.dto.user;

import com.sandcastle.immerse.model.entity.UserEntity;
import lombok.*;

import javax.persistence.Entity;
import java.time.LocalDate;

@Data
@Builder
public class UserSignupRequest {

    private String email;
    private String password;
    private String name;
    private String gender;
    private String nickname;
    private LocalDate birthday;
    private String phoneNumber;

    public UserEntity toEntity() {
        return UserEntity.builder()
                .email(email)
                .password(password)
                .name(name)
                .gender(gender)
                .nickname(nickname)
                .birthday(birthday)
                .phoneNumber(phoneNumber)
                .build();
    }

}
