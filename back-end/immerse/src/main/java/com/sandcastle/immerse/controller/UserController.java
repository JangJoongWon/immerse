package com.sandcastle.immerse.controller;

import com.sandcastle.immerse.model.dto.UserDto;
import com.sandcastle.immerse.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody UserDto userDtoRequest) throws Exception {
        UserDto userDtoResponse = userService.signup(userDtoRequest);
        return ResponseEntity.ok().body(userDtoResponse);
    }

    @PostMapping("/signin")
    public ResponseEntity<?> signin(@RequestBody UserDto userDtoRequest) throws Exception {
        String token = userService.signin(userDtoRequest);
        return ResponseEntity.ok().body(token);
    }

    @GetMapping("")
    public ResponseEntity<?> getMyUser(Authentication authentication) throws Exception {
        Long userId = Long.valueOf(authentication.getName());
        UserDto userDtoResponse = userService.getMyUser(userId);
        return ResponseEntity.ok().body(userDtoResponse);
    }

    @GetMapping("/{nickname}")
    public ResponseEntity<?> getUser(@PathVariable String nickname) throws Exception {
        UserDto userDtoResponse = userService.getUser(nickname);
        return ResponseEntity.ok().body(userDtoResponse);
    }

    @GetMapping("/check/{nickname}")
    public ResponseEntity<?> existsByNickname(@PathVariable String nickname) throws Exception {
        boolean check = userService.existsByNickname(nickname);
        return ResponseEntity.ok().body(check);
    }

    @PutMapping("/update/info")
    public ResponseEntity<?> updateUser(@RequestBody UserDto userDtoRequest, Authentication authentication) throws Exception {
        Long userId = Long.valueOf(authentication.getName());
        userService.updateUser(userId, userDtoRequest);
        return ResponseEntity.ok().body("유저정보 수정완료");
    }

    @DeleteMapping("/withdrawal")
    public ResponseEntity<?> withdrawal(Authentication authentication) throws Exception {
        Long userId = Long.valueOf(authentication.getName());
        int changedStatus = userService.withdrawal(userId);
        return ResponseEntity.ok().body(changedStatus);
    }

}
