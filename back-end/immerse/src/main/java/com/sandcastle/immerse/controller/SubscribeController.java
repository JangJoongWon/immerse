package com.sandcastle.immerse.controller;

import com.sandcastle.immerse.model.dto.UserDto;
import com.sandcastle.immerse.service.SubscribeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/subscribe")
@RequiredArgsConstructor
public class SubscribeController {

    private final SubscribeService subscribeServiceImpl;

    @PostMapping("")
    public ResponseEntity<?> saveSubscribe(Authentication authentication, @RequestBody Map<String, Object> body) {
        Long followerId = Long.valueOf(authentication.getName());
        Long followingId = Long.valueOf(body.get("userId").toString());
        subscribeServiceImpl.saveSubscribe(followerId, followingId);
        return ResponseEntity.ok().body("구독정보 저장완료");
    }

    // 사용자가 구독한 사람들 반환(follower의 following들을 반환)
    @GetMapping("/following/{userId}")
    public ResponseEntity<?> getFolloings(@PathVariable Long userId) {
        List<UserDto> userDtoList = subscribeServiceImpl.getFollowings(userId);
        return ResponseEntity.ok().body(userDtoList);
    }

    // 사용자를 구독한 사람들 반환(following의 follower들을 반환)
    @GetMapping("/follower/{userId}")
    public ResponseEntity<?> getFollowers(@PathVariable Long userId) {
        List<UserDto> userDtoList = subscribeServiceImpl.getFollowers(userId);
        return ResponseEntity.ok().body(userDtoList);
    }

    @GetMapping("/check/{followingId}")
    public ResponseEntity<?> existsByFollowingId(Authentication authentication, @PathVariable Long followingId) {
        Long userId = Long.valueOf(authentication.getName());
        boolean check = subscribeServiceImpl.existsByFollowingId(userId, followingId);
        return ResponseEntity.ok().body(check);
    }

    @DeleteMapping("")
    public ResponseEntity<?> deleteSubscribe(Authentication authentication, Long followingId) {
        Long followerId = Long.valueOf(authentication.getName());
        subscribeServiceImpl.deleteSubscribe(followerId, followingId);
        return ResponseEntity.ok().body("구독정보 삭제완료");
    }
}
