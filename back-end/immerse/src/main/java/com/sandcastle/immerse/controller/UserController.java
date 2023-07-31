package com.sandcastle.immerse.controller;

import com.sandcastle.immerse.model.dto.user.UserSigninRequest;
import com.sandcastle.immerse.model.dto.user.UserSignupRequest;
import com.sandcastle.immerse.model.entity.UserEntity;
import com.sandcastle.immerse.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<?> signupUser(@RequestBody UserSignupRequest user) throws Exception {
        return new ResponseEntity<UserSignupRequest>(userService.signupUser(user), HttpStatus.OK);
    }

    @PostMapping("/signin")
    public ResponseEntity<?> signinUser(@RequestBody UserSigninRequest userLoginInfo) {
        return new ResponseEntity<Optional<UserEntity>>(userService.signinUser(userLoginInfo), HttpStatus.OK);
    }

    @PutMapping("/withdrawal/{userId}")
    public ResponseEntity<?> withdrawalUser(@PathVariable Long userId) {
        System.out.println("userId : " + userId);
        return new ResponseEntity<Integer>(userService.withdrawal(userId), HttpStatus.OK);
    }

}
