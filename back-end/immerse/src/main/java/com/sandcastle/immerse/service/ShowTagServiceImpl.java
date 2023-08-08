package com.sandcastle.immerse.service;

import com.sandcastle.immerse.model.dto.ShowTagDto;
import com.sandcastle.immerse.model.entity.ShowEntity;
import com.sandcastle.immerse.model.entity.ShowTagEntity;
import com.sandcastle.immerse.model.entity.TagEntity;
import com.sandcastle.immerse.repository.ShowRepository;
import com.sandcastle.immerse.repository.ShowTagRepository;
import com.sandcastle.immerse.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ShowTagServiceImpl implements ShowTagService{

    private final ShowTagRepository showTagRepository;
    private final ShowRepository showRepository;
    private final TagRepository tagRepository;

    @Override
    @Transactional
    public void saveAllShowTag(Long showId, List<ShowTagDto> showTagDtoList) {

        Optional<ShowEntity> showEntity = showRepository.findById(showId);

        List<ShowTagEntity> showTagEntities = showTagDtoList.stream()
                .map(dto -> {
                    Optional<TagEntity> tagEntity = tagRepository.findById(dto.getTagId());
                    return ShowTagEntity.builder()
                            .showEntity(showEntity.get())
                            .tagEntity(tagEntity.get())
                            .build();
                })
                .collect(Collectors.toList());
        showTagRepository.saveAll(showTagEntities);
    }
    @Override
    @Transactional
    public void updateShowTag(Long showId, List<ShowTagDto> showTagDtoList) {
        deleteShowTag(showId);
        saveAllShowTag(showId, showTagDtoList);
    }

    @Override
    @Transactional
    public void deleteShowTag(Long showId) {
        showTagRepository.deleteAllByShowId(showId);
    }
}
