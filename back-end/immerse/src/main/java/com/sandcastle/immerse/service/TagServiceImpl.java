package com.sandcastle.immerse.service;

import com.sandcastle.immerse.model.dto.TagDto;
import com.sandcastle.immerse.model.entity.TagEntity;
import com.sandcastle.immerse.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TagServiceImpl implements TagService {

    private final TagRepository tagRepository;


    @Override
    @Transactional
    public void createTag(TagDto tagDto) {
        tagRepository.save(tagDto);
        return;
    }

    @Override
    @Transactional
    public List<TagDto> findallTag() {
        List<TagEntity> tags = tagRepository.findAll();
        return tags.stream().map(TagDto::new).collect(Collectors.toList());
    }

    @Override
    public Optional<TagDto> findById(Long id) {
        Optional<TagEntity> tagEntity = tagRepository.findById(id);
        if(tagEntity.isPresent()){

        }
        return Optional.empty();
    }

    @Override
    public Optional<TagDto> findByName(String name) {
        return Optional.empty();
    }
}
