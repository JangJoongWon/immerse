package com.sandcastle.immerse.controller;

import com.sandcastle.immerse.model.dto.user.UserSigninRequest;
import com.sandcastle.immerse.model.dto.user.UserSignupRequest;
import com.sandcastle.immerse.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<?> signupUser(@RequestBody UserSignupRequest userSignupRequest) throws Exception {
        UserSignupRequest userSignupResponse = userService.signupUser(userSignupRequest);
        return ResponseEntity.ok().body(userSignupResponse);
    }

    @PostMapping("/signin")
    public ResponseEntity<?> signinUser(@RequestBody UserSigninRequest userSigninRequest) {
        String token = userService.signinUser(userSigninRequest);
        return ResponseEntity.ok().body(token);
    }

    @PutMapping("/withdrawal/{userId}")
    public ResponseEntity<?> withdrawalUser(@PathVariable Long userId) {
        return new ResponseEntity<Integer>(userService.withdrawal(userId), HttpStatus.OK);
    }

}
