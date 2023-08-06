package com.sandcastle.immerse.service;

import com.sandcastle.immerse.exception.AppException;
import com.sandcastle.immerse.exception.ErrorCode;
import com.sandcastle.immerse.model.dto.UserDto;
import com.sandcastle.immerse.model.entity.SubscribeEntity;
import com.sandcastle.immerse.model.entity.UserEntity;
import com.sandcastle.immerse.repository.SubscribeRepository;
import com.sandcastle.immerse.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SubscribeServiceImpl implements SubscribeService {

    private final SubscribeRepository subscribeRepository;

    private final UserRepository userRepository;

    @Override
    @Transactional
    public void saveSubscribe(Long followerId, Long followingId) {

        UserEntity follower = userRepository.findById(followerId)
                .orElseThrow(() -> {
                    return new AppException(ErrorCode.USERID_NOT_FOUND, followerId + "은(는) 존재하지 않는 고유번호 입니다.");
                });

        UserEntity following = userRepository.findById(followingId)
                .orElseThrow(() -> {
                    return new AppException(ErrorCode.USERID_NOT_FOUND, followingId + "은(는) 존재하지 않는 고유번호 입니다.");
                });

        SubscribeEntity subscribeEntity = SubscribeEntity.builder()
                                .followerId(follower)
                                .followingId(following)
                                .build();

        subscribeRepository.save(subscribeEntity);
    }

    @Override
    @Transactional
    public List<UserDto> getFollowings(Long userId) {
        List<UserEntity> userEntityList = userRepository.findFollowings(userId);

        List<UserDto> userDtoList = new ArrayList<>();

        for (UserEntity ue : userEntityList) {
            UserDto userDto = UserDto.builder()
                    .userId(ue.getUserId())
                    .email(ue.getEmail())
                    .name(ue.getName())
                    .gender(ue.getGender())
                    .nickname(ue.getNickname())
                    .birthday(ue.getBirthday())
                    .profilePicture(ue.getProfilePicture())
                    .bannerPicture(ue.getBannerPicture())
                    .selfDescription(ue.getSelfDescription())
                    .build();

            userDtoList.add(userDto);
        }

        return userDtoList;
    }

    @Override
    @Transactional
    public List<UserDto> getFollowers(Long userId) {

        List<UserEntity> userEntityList = userRepository.findFollowers(userId);

        List<UserDto> userDtoList = new ArrayList<>();

        for (UserEntity ue : userEntityList) {
            UserDto userDto = UserDto.builder()
                    .userId(ue.getUserId())
                    .email(ue.getEmail())
                    .name(ue.getName())
                    .gender(ue.getGender())
                    .nickname(ue.getNickname())
                    .birthday(ue.getBirthday())
                    .profilePicture(ue.getProfilePicture())
                    .bannerPicture(ue.getBannerPicture())
                    .selfDescription(ue.getSelfDescription())
                    .build();

            userDtoList.add(userDto);
        }

        return userDtoList;
    }

    @Override
    @Transactional
    public void deleteSubscribe(Long followerId, Long followingId) {

        subscribeRepository.deleteByFollwerFollowing(followerId, followingId);
    }

}
