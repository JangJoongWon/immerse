package com.sandcastle.immerse.controller;

import com.sandcastle.immerse.model.dto.user.UserSigninRequest;
import com.sandcastle.immerse.model.dto.user.UserSignupRequest;
import com.sandcastle.immerse.model.entity.UserEntity;
import com.sandcastle.immerse.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signupUser(@RequestBody UserSignupRequest user) throws Exception {
        return new ResponseEntity<UserSignupRequest>(userService.signupUser(user), HttpStatus.OK);
    }

    @PostMapping("/signin")
    public ResponseEntity<?> signinUser(@RequestBody UserSigninRequest userLoginInfo) {
        return new ResponseEntity<Optional<UserEntity>>(userService.signinUser(userLoginInfo), HttpStatus.OK);
    }

    @DeleteMapping("/withdrawal/{userId}")
    public ResponseEntity<?> withdrawalUser(@PathVariable Long userId) {
        System.out.println("userId : " + userId);
        return new ResponseEntity<Integer>(userService.withdrawal(userId), HttpStatus.OK);
    }

//    @GetMapping("/{email}")
//    public ResponseEntity<?> findById(@PathVariable Long userId) throws  Exception {
//        try {
//            return new ResponseEntity<UserEntity>(userService.findById(userId), HttpStatus.OK);
//        } catch {
//            return new ResponseEntity<String>("서버 오류", HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
}
