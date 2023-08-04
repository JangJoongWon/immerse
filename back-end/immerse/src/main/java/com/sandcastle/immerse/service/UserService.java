package com.sandcastle.immerse.service;

import com.sandcastle.immerse.model.dto.UserDto;

public interface UserService {

    void signup(UserDto userDto);
    String signin(UserDto userDto);
    UserDto getMyUser(Long userId);
    UserDto getUser(Long userId);
    boolean existsByNickname(String nickname);
    void updateUser(Long userId, UserDto userDto);
    int withdrawal(Long userId);

}
