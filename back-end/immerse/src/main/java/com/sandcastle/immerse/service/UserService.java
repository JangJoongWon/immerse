package com.sandcastle.immerse.service;

import com.sandcastle.immerse.exception.AppException;
import com.sandcastle.immerse.exception.ErrorCode;
import com.sandcastle.immerse.model.dto.UserDto;
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
    private Long expireTimeMs = 1000 * 60 * 60l * 24; // 토큰 만료시간 : 24시간

    @Transactional
    public UserDto signup(UserDto userDto) {

        String email = userDto.getEmail();
        String nickname = userDto.getNickname();

        // email 중복 검사
        userRepository.findByEmail(email)
                .ifPresent(user -> {
                    throw new AppException(ErrorCode.EMAIL_DUPLICATED, "이미 사용중인 아이디입니다.");
                });

        // nickname 중복 검사
        userRepository.findByNickname(nickname)
                .ifPresent(user -> {
                    throw new AppException(ErrorCode.NICKNAME_DUPLICATED, "이미 사용중인 닉네임입니다.");
                });

        UserEntity userEntity = UserEntity.builder()
                .email(userDto.getEmail())
                .password(encoder.encode(userDto.getPassword()))
                .name(userDto.getName())
                .gender(userDto.getGender())
                .nickname(userDto.getNickname())
                .birthday(userDto.getBirthday())
                .phoneNumber(userDto.getPhoneNumber())
                .build();

        userRepository.save(userEntity);

        return userRepository.findByEmail(email).orElseThrow().toDto();
    }

    @Transactional
    public String signin(UserDto userDtoRequest) {

        String email = userDtoRequest.getEmail();
        String password = userDtoRequest.getPassword();

        // email이 없음
        UserEntity selectedUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.EMAIL_NOT_FOUND, email + "은 존재하지 않는 아이디입니다."));

        // password 틀림
        if(!encoder.matches(password, selectedUser.getPassword())) {
            throw new AppException(ErrorCode.INVALID_PASSWORD, "잘못된 패스워드를 입력 했습니다.");
        }

        // 탈퇴하고 대기상태 일때 (status가 0일 때)
        // 나중에 복구 기능으로 대체할 것.
        if(selectedUser.getStatus() == 0) {
            throw new AppException(ErrorCode.WITHDRAWAL_SIGNIN, "탈퇴한 회원입니다.");
        }

        String token = JwtUtil.createToken(selectedUser.getUserId(), key, expireTimeMs);

        return token;
    }

    @Transactional
    public UserDto getMyUser(Long userId) {

        UserEntity userEntity = userRepository.findById(userId)
                .orElseThrow(() -> {
                    return new IllegalArgumentException("유저정보 조회실패");
                });

        return userEntity.toDto();
    }

    @Transactional
    public UserDto getUser(String nickname) {

        UserEntity userEntity = userRepository.findByNickname(nickname)
                .orElseThrow(() -> {
                    return new AppException(ErrorCode.NICKNAME_NOT_FOUND, nickname + "은 존재하지 않는 닉네임입니다.");
                });

        return userEntity.toDto();
    }

    @Transactional
    public boolean existsByNickname(String nickname) {
        return userRepository.existsByNickname(nickname);
    }

    @Transactional
    public void updateUser(Long userId, UserDto userDtoRequest) {

        UserEntity userEntity = userRepository.findById(userId)
                .orElseThrow(() -> {
                    return new IllegalArgumentException("유저정보 수정실패");
                });

        // nickname 중복 검사
        userRepository.findByNickname(userDtoRequest.getNickname())
                .ifPresent(user -> {
                    throw new AppException(ErrorCode.NICKNAME_DUPLICATED, "이미 사용중인 닉네임입니다.");
                });

        userEntity.updateUser(userDtoRequest);
    }

    @Transactional
    public int withdrawal(Long userId) {

        UserEntity userEntity = userRepository.findById(userId)
                .orElseThrow(() -> {
                    return new IllegalArgumentException("회원탈퇴 실패");
                });

        return userEntity.updateStatusWithdrawal();
    }

}
