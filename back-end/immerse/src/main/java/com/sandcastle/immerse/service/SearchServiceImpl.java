package com.sandcastle.immerse.service;

import com.sandcastle.immerse.model.dto.SearchDto;
import com.sandcastle.immerse.model.dto.UserDto;
import com.sandcastle.immerse.model.entity.SearchEntity;
import com.sandcastle.immerse.model.entity.UserEntity;
import com.sandcastle.immerse.repository.SearchRepository;
import com.sandcastle.immerse.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SearchServiceImpl implements SearchService {
    private final SearchRepository searchRepository;
    private final UserRepository userRepository;

    @Override
    public void saveSearch(Long userId, SearchDto searchDto) {

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

    @Override
    public List<SearchDto> findAllMySearch(Long userId) {

        List<SearchEntity> searchEntityList = searchRepository.findAllByUserEntity_UserId(userId);

        List<SearchDto> searchDtoList = new ArrayList<>();

        for (SearchEntity se: searchEntityList) {
            SearchDto searchDto = SearchDto.builder()
                    .searchTime(se.getSearchTime())
                    .searchContent(se.getSearchContent())
                    .build();

            searchDtoList.add(searchDto);
        }

        return searchDtoList;
    }

    @Override
    public List<UserDto> findAllUserContainContent(String nickname) {
        List<UserEntity> userEntityList = userRepository.findByNicknameContains(nickname);

        List<UserDto> userDtoList = new ArrayList<>();

        for (UserEntity ue: userEntityList) {
            UserDto userDto = UserDto.builder()
                    .email(ue.getEmail())
                    .nickname(ue.getNickname())
                    .selfDescription(ue.getSelfDescription())
                    .build();

            userDtoList.add(userDto);
        }

        return userDtoList;
    }
}
