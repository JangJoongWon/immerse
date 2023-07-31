package com.sandcastle.immerse.service;

import com.sandcastle.immerse.model.dto.user.UserSigninRequest;
import com.sandcastle.immerse.model.dto.user.UserSignupRequest;
import com.sandcastle.immerse.model.entity.UserEntity;
import com.sandcastle.immerse.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional
    public UserSignupRequest signupUser(UserSignupRequest user) {
        UserEntity userEntity = user.toEntity();
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
