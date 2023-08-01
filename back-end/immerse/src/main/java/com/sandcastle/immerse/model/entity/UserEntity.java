package com.sandcastle.immerse.model.entity;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "users")
public class UserEntity {
    @Id
    @Column(name = "user_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY) // AUTO_INCREMENT
    private Long userId;

    @Column(length = 30, unique = true)
    private String email;

    @NotNull
    private String password;

    @NotNull
    @Column(length = 15)
    private String name;

    @NotNull
    @Column(length = 1)
    private String gender;

    @NotNull
    @Column(length = 15)
    private String nickname;

    @NotNull
    private LocalDate birthday;

    @NotNull
    @Column(name = "phone_number", length = 12)
    private String phoneNumber;

    @Column(name = "profile_picture")
    private String profilePicture;

    private int point = 0;

    private int status = 1;

    @Lob
    @Column(name = "self_description")
    private String selfDescription;

    @Builder
    public UserEntity(String email, String password, String name, String gender, String nickname, LocalDate birthday, String phoneNumber) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.gender = gender;
        this.nickname = nickname;
        this.birthday = birthday;
        this.phoneNumber = phoneNumber;
    }

//    public UserSignupRequest toDto() {
//        return UserSignupRequest.builder()
//                .email(email)
//                .password(password)
//                .name(name)
//                .gender(gender)
//                .nickname(nickname)
//                .birthday(birthday)
//                .phoneNumber(phoneNumber)
//                .build();
//    }

    public int updateStatusWithdrawal() {
        this.status = 0;

        return this.status;
    }
}
