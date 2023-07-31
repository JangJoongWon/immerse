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

    @Column(length = 20, unique = true)
    private String email;

    @NotNull
    @Column(length = 20)
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

    /**
     * 요청에서 int는 입력값이 없으면 0이 들어오고, String은 입력값이 없으면 null이 들어옵니다.
     *
     * point와 status는 입력값이 없어서 0이 들어오지만 point는 0으로, status는 1로 default값을 지정하고 싶습니다.
     *
     * @ColumnDefault는 테이블 생성시에 default값을 지정합니다. 그래서 입력이 0이면 0이 입력될 것입니다.
     *
     * @Builder.Default는 객체 생성시에 default값을 지정합니다. 그래서 입력이 무엇이든 defualt값이 입력될 것입니다.
     *
     * 따라서 @Builder.Default를 사용해서 요청입력값이 없어 0이 입력되어도 default값으로 객체를 생성해 INSERT할 수 있습니다.
     */

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
