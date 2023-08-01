package com.sandcastle.immerse.service;

import com.sandcastle.immerse.exception.AppException;
import com.sandcastle.immerse.exception.ErrorCode;
import com.sandcastle.immerse.model.dto.user.UserSigninRequest;
import com.sandcastle.immerse.model.dto.user.UserSignupRequest;
import com.sandcastle.immerse.model.entity.UserEntity;
import com.sandcastle.immerse.repository.UserRepository;
import com.sandcastle.immerse.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder;
    private String key = "testKey";
    private Long expireTimeMs = 1000 * 60 * 60l * 3; // 토큰 만료시간 : 3시간

    @Transactional
    public UserSignupRequest signupUser(UserSignupRequest userSignupRequest) {

        UserEntity userEntity = UserEntity.builder()
                .email(userSignupRequest.getEmail())
                .password(encoder.encode(userSignupRequest.getPassword()))
                .name(userSignupRequest.getName())
                .gender(userSignupRequest.getGender())
                .nickname(userSignupRequest.getNickname())
                .birthday(userSignupRequest.getBirthday())
                .phoneNumber(userSignupRequest.getPhoneNumber())
                .build();

        userRepository.save(userEntity);

        return userSignupRequest;
    }

    @Transactional
    public String signinUser(UserSigninRequest userSigninRequest) {

        String email = userSigninRequest.getEmail();
        String password = userSigninRequest.getPassword();

        // email이 없음
        UserEntity selectedUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.USEREMAIL_NOT_FOUND, email + "이 없습니다."));

        // password 틀림
        if(!encoder.matches(password, selectedUser.getPassword())) {
            throw new AppException(ErrorCode.INVALID_PASSWORD, "패스워드를 잘못 입력 했습니다.");
        }

        String token = JwtUtil.createToken(selectedUser.getEmail(), key, expireTimeMs);

        return token;
    }

    @Transactional
    public int withdrawal(Long userId) {
        UserEntity userEntity = userRepository.findById(userId)
                    .orElseThrow(() -> { return new IllegalArgumentException("회원탈퇴 실패");
                });

        return userEntity.updateStatusWithdrawal();
    }

}
