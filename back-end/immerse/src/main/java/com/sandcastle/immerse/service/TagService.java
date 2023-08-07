package com.sandcastle.immerse.service;

import com.sandcastle.immerse.model.dto.TagDto;

import java.util.List;
import java.util.Optional;

public interface TagService{

    void createTag(TagDto tagDto);

    List<TagDto> findallTag();

    Optional<TagDto> findById(Long id);

    Optional<TagDto> findByName(String name);

    List<TagDto> findByShowId(Long showId);

}
