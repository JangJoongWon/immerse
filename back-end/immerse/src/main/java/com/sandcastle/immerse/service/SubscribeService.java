package com.sandcastle.immerse.service;

import com.sandcastle.immerse.model.dto.UserDto;

import java.util.List;

public interface SubscribeService {

    void saveSubscribe(Long followerId, Long followingId);

    List<UserDto> getFollowings(Long userId);

    List<UserDto> getFollowers(Long userId);

    void deleteSubscribe(Long followerId, Long followingId);

}
