package com.sandcastle.immerse.controller;

import com.sandcastle.immerse.model.dto.UserDto;
import com.sandcastle.immerse.model.dto.UserWrapper;
import com.sandcastle.immerse.service.StorageServiceImpl;
import com.sandcastle.immerse.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userServiceImpl;
    private final StorageServiceImpl storageService;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody UserDto userDto) throws Exception {
        userServiceImpl.signup(userDto);
        return ResponseEntity.ok().body("회원가입이 완료되었습니다.");
    }

    @PostMapping("/signin")
    public ResponseEntity<?> signin(@RequestBody UserDto userDto) throws Exception {
        String token = userServiceImpl.signin(userDto);
        return ResponseEntity.ok().body(token);
    }

    @GetMapping("/mypage")
    public ResponseEntity<?> getMyUser(Authentication authentication) throws Exception {
        Long userId = Long.valueOf(authentication.getName());
        UserDto userDto = userServiceImpl.getMyUser(userId);
        return ResponseEntity.ok().body(userDto);
    }

//    @GetMapping("/mypage/{userId}")
//    public ResponseEntity<?> getUser(@PathVariable Long userId) throws Exception {
//        UserDto userDto = userServiceImpl.getUser(userId);
//        return ResponseEntity.ok().body(userDto);
//    }

    @GetMapping("/mypage/{nickname}")
    public ResponseEntity<?> getUser(@PathVariable String nickname) throws Exception {
        UserDto userDto = userServiceImpl.getUser(nickname);
        return ResponseEntity.ok().body(userDto);
    }

    @GetMapping("/check/{nickname}")
    public ResponseEntity<?> existsByNickname(@PathVariable String nickname) throws Exception {
        boolean check = userServiceImpl.existsByNickname(nickname);
        return ResponseEntity.ok().body(check);
    }

    @PutMapping("/update/info")
    public ResponseEntity<?> updateUser(@RequestPart UserWrapper wrapper,
                                        Authentication authentication) throws Exception {
        Long userId = Long.valueOf(authentication.getName());

        UserDto userDto = wrapper.getUserDto();
        MultipartFile bannerFile = wrapper.getBannerFile();
        MultipartFile profileFile = wrapper.getProfileFile();

        userDto.setBannerPicture(storageService.uploadFile(bannerFile));
        userDto.setProfilePicture(storageService.uploadFile(profileFile));
        userServiceImpl.updateUser(userId, userDto);
        return ResponseEntity.ok().body("회원정보가 수정되었습니다.");
    }

    @DeleteMapping("/withdrawal")
    public ResponseEntity<?> withdrawal(Authentication authentication) throws Exception {
        Long userId = Long.valueOf(authentication.getName());
        int changedStatus = userServiceImpl.withdrawal(userId);
        return ResponseEntity.ok().body(changedStatus);
    }

}
