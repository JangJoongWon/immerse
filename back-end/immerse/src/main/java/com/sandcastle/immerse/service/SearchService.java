package com.sandcastle.immerse.service;

import com.sandcastle.immerse.model.dto.SearchDto;
import com.sandcastle.immerse.model.dto.UserDto;

import java.util.List;

public interface SearchService {
    void saveSearch(Long userId, SearchDto searchDto);
    List<SearchDto> findAllMySearch(Long userId);

    List<UserDto> findAllUserContainContent(String nickname);
}
