package com.sandcastle.immerse.controller;

import com.sandcastle.immerse.model.dto.SearchDto;
import com.sandcastle.immerse.model.dto.UserDto;
import com.sandcastle.immerse.service.SearchService;
import com.sandcastle.immerse.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/search")
@RequiredArgsConstructor
public class SearchController {
    private final SearchService searchServiceImpl;

    @PostMapping("")
    public ResponseEntity<?> saveSearch(SearchDto searchDto, Authentication authentication) {
        Long userId = Long.valueOf(authentication.getName());
        searchServiceImpl.saveSearch(userId, searchDto);
        return ResponseEntity.ok().body("검색기록 저장완료");
    }

    @GetMapping("")
    public ResponseEntity<?> findAllMySearch(Authentication authentication) {
        Long userId = Long.valueOf(authentication.getName());
        List<SearchDto> searchDtoList= searchServiceImpl.findAllMySearch(userId);
        return ResponseEntity.ok().body(searchDtoList);
    }

    @GetMapping("/user/{nickname}")
    public ResponseEntity<?> findAllUserContainNickname(@PathVariable String nickname) {
        List<UserDto> userDtoList = searchServiceImpl.findAllUserContainContent(nickname);
        return ResponseEntity.ok().body(userDtoList);
    }
}
