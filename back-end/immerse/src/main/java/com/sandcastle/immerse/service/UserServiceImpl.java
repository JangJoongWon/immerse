package com.sandcastle.immerse.service;

import com.sandcastle.immerse.exception.AppException;
import com.sandcastle.immerse.exception.ErrorCode;
import com.sandcastle.immerse.model.dto.UserDto;
import com.sandcastle.immerse.model.entity.UserEntity;
import com.sandcastle.immerse.repository.UserRepository;
import com.sandcastle.immerse.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder;
    private String key = "testKey";
    private Long expireTimeMs = 1000 * 60 * 60l * 24; // 토큰 만료시간 : 24시간

    @Override
    @Transactional
    public void signup(UserDto userDto) {

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
    }

    @Override
    @Transactional
    public String signin(UserDto userDto) {

        String email = userDto.getEmail();
        String password = userDto.getPassword();

        // email이 없음
        UserEntity selectedUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.EMAIL_NOT_FOUND, email + " 은(는) 존재하지 않는 아이디입니다."));

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

    @Override
    @Transactional
    public UserDto getMyUser(Long userId) {

        UserEntity userEntity = userRepository.findById(userId)
                .orElseThrow(() -> {
                    return new AppException(ErrorCode.USERID_NOT_FOUND, userId + "은(는) 존재하지 않는 고유번호 입니다.");
                });

        return UserDto.builder()
                .userId(userEntity.getUserId())
                .email(userEntity.getEmail())
                .name(userEntity.getName())
                .gender(userEntity.getGender())
                .nickname(userEntity.getNickname())
                .birthday(userEntity.getBirthday())
                .profilePicture(userEntity.getProfilePicture())
                .bannerPicture(userEntity.getBannerPicture())
                .point(userEntity.getPoint())
                .selfDescription(userEntity.getSelfDescription())
                .build();
    }

//    @Override
//    @Transactional
//    public UserDto getUser(Long userId) {
//
//        UserEntity userEntity = userRepository.findById(userId)
//                .orElseThrow(() -> {
//                    return new AppException(ErrorCode.USERID_NOT_FOUND, userId + "은(는) 존재하지 않는 고유번호 입니다.");
//                });
//
//        return UserDto.builder()
//                .email(userEntity.getEmail())
//                .name(userEntity.getName())
//                .gender(userEntity.getGender())
//                .nickname(userEntity.getNickname())
//                .birthday(userEntity.getBirthday())
//                .profilePicture(userEntity.getProfilePicture())
//                .bannerPicture(userEntity.getBannerPicture())
//                .selfDescription(userEntity.getSelfDescription())
//                .build();
//    }

    @Override
    @Transactional
    public UserDto getUser(String nickname) {

        UserEntity userEntity = userRepository.findByNickname(nickname)
                .orElseThrow(() -> {
                    return new AppException(ErrorCode.NICKNAME_NOT_FOUND, nickname + "은(는) 존재하지 않는 닉네임 입니다.");
                });

        return UserDto.builder()
                .userId(userEntity.getUserId())
                .email(userEntity.getEmail())
                .name(userEntity.getName())
                .gender(userEntity.getGender())
                .nickname(userEntity.getNickname())
                .birthday(userEntity.getBirthday())
                .profilePicture(userEntity.getProfilePicture())
                .bannerPicture(userEntity.getBannerPicture())
                .selfDescription(userEntity.getSelfDescription())
                .build();
    }

    @Override
    @Transactional
    public boolean existsByNickname(String nickname) {
        return userRepository.existsByNickname(nickname);
    }

    @Override
    @Transactional
    public void updateUser(Long userId, UserDto userDto) {

        UserEntity userEntity = userRepository.findById(userId)
                .orElseThrow(() -> {
                    return new AppException(ErrorCode.USERID_NOT_FOUND, userId + "은(는) 존재하지 않는 고유번호 입니다.");
                });

        // nickname 중복 검사
        if(!userDto.getNickname().equals(userEntity.getNickname())) {
            userRepository.findByNickname(userDto.getNickname())
                    .ifPresent(user -> {
                        throw new AppException(ErrorCode.NICKNAME_DUPLICATED, "이미 사용중인 닉네임입니다.");
                    });
        }

        /**
         * 더티체킹으로 변경시 entity에 @NotNull이 설정되어있어도 값이 null로 수정 되어버린다.
         *
         * 원인 : @NotNull이 JPA에서 Entity 생성자에만 관여하고 DB에서는 nullable = true로 남아있다.
         *
         * 해결 : DB의 nullable = false로 설정한다.(JPA의 @Column속성에서도 가능)
         */

        userEntity.updateUser(userDto);
    }

    @Override
    @Transactional
    public int withdrawal(Long userId) {

        UserEntity userEntity = userRepository.findById(userId)
                .orElseThrow(() -> {
                    return new AppException(ErrorCode.USERID_NOT_FOUND, userId + "은(는) 존재하지 않는 고유번호 입니다.");
                });

        return userEntity.updateStatusWithdrawal();
    }

}
