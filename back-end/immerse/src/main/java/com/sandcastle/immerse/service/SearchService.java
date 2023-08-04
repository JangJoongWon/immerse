package com.sandcastle.immerse.service;

import com.sandcastle.immerse.model.dto.SearchDto;
import com.sandcastle.immerse.model.dto.UserDto;
import com.sandcastle.immerse.model.dto.show.ShowListResponse;

import java.util.List;

public interface SearchService {
    void saveSearch(Long userId, SearchDto searchDto);
    List<SearchDto> findAllMySearchHistories(Long userId);

    List<UserDto> findAllUsersContainContent(String content);

    List<ShowListResponse> findAllShowsContainContent(String content);

    List<ShowListResponse> findAllShowsContainTag(String tag);
}
