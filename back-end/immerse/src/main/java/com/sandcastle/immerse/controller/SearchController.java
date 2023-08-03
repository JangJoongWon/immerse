package com.sandcastle.immerse.controller;

import com.sandcastle.immerse.model.dto.SearchDto;
import com.sandcastle.immerse.service.SearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/search")
@RequiredArgsConstructor
public class SearchController {
    private final SearchService searchServiceImpl;

    @PostMapping("")
    public ResponseEntity<?> recodeSearch(SearchDto searchDto, Authentication authentication) {
        Long userId = Long.valueOf(authentication.getName());
        searchServiceImpl.recodeSearch(userId, searchDto);
        return ResponseEntity.ok().body("검색기록 저장완료");
    }
}
