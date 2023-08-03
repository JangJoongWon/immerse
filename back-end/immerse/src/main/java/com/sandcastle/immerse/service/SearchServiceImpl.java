package com.sandcastle.immerse.service;

import com.sandcastle.immerse.exception.AppException;
import com.sandcastle.immerse.exception.ErrorCode;
import com.sandcastle.immerse.model.dto.SearchDto;
import com.sandcastle.immerse.model.entity.SearchEntity;
import com.sandcastle.immerse.model.entity.UserEntity;
import com.sandcastle.immerse.repository.SearchRepository;
import com.sandcastle.immerse.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SearchServiceImpl implements SearchService {
    private final SearchRepository searchRepository;
    private final UserRepository userRepository;

    @Override
    public void recodeSearch(Long userId, SearchDto searchDto) {

        UserEntity userEntity = userRepository.findById(userId)
                .orElseThrow(() -> {
                    return new IllegalArgumentException("Id없음요");
                });

        SearchEntity searchEntity = SearchEntity.builder()
                .searchTime(searchDto.getSearchTime())
                .searchContent(searchDto.getSearchContent())
                .userEntity(userEntity)
                .build();

        searchRepository.save(searchEntity);
    }
}
