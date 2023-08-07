package com.sandcastle.immerse.controller;

import com.sandcastle.immerse.model.dto.SearchDto;
import com.sandcastle.immerse.model.dto.UserDto;
import com.sandcastle.immerse.model.dto.show.ShowListResponse;
import com.sandcastle.immerse.service.SearchService;
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
    public ResponseEntity<?> findAllMySearchHistories(Authentication authentication) {
        Long userId = Long.valueOf(authentication.getName());
        List<SearchDto> searchDtoList= searchServiceImpl.findAllMySearchHistories(userId);
        return ResponseEntity.ok().body(searchDtoList);
    }

    @GetMapping("/user/{content}")
    public ResponseEntity<?> findAllUsersContainContent(@PathVariable String content) {
        List<UserDto> userDtoList = searchServiceImpl.findAllUsersContainContent(content);
        return ResponseEntity.ok().body(userDtoList);
    }

    @GetMapping("/show/{content}")
    public ResponseEntity<?> findAllShowsContainContent(@PathVariable String content) {
        List<ShowListResponse> showDtoList = searchServiceImpl.findAllShowsContainContent(content);
        return ResponseEntity.ok().body(showDtoList);
    }

    @GetMapping("/tag/{content}")
    public ResponseEntity<?> findAllShowsContainTag(@PathVariable String content) {
        List<ShowListResponse> showDtoList = searchServiceImpl.findAllShowsContainTag(content);
        return ResponseEntity.ok().body(showDtoList);
    }
}
