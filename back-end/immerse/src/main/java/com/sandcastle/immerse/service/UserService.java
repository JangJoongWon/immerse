package com.sandcastle.immerse.service;

import com.sandcastle.immerse.model.dto.user.UserSigninRequest;
import com.sandcastle.immerse.model.dto.user.UserSignupRequest;
import com.sandcastle.immerse.model.entity.UserEntity;
import com.sandcastle.immerse.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder;

    @Transactional
    public UserSignupRequest signupUser(UserSignupRequest user) {
        UserEntity userEntity = UserEntity.builder()
                .email(user.getEmail())
                .password(encoder.encode(user.getPassword()))
                .name(user.getName())
                .gender(user.getGender())
                .nickname(user.getNickname())
                .birthday(user.getBirthday())
                .phoneNumber(user.getPhoneNumber())
                .build();
        userRepository.save(userEntity);
        return user;
    }

    @Transactional
    public Optional<UserEntity> signinUser(UserSigninRequest userLoginInfo) {
        Optional<UserEntity> userEntity = userRepository.findByEmailAndPassword(userLoginInfo.getEmail(), userLoginInfo.getPassword());
        return userEntity;
    }

    @Transactional
    public int withdrawal(Long userId) {
        UserEntity userEntity = userRepository.findById(userId)
                    .orElseThrow(() -> { return new IllegalArgumentException("회원탈퇴 실패");
                });

        return userEntity.updateStatusWithdrawal();
    }

}
