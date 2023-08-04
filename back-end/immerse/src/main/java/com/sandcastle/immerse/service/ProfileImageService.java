package com.sandcastle.immerse.service;

import com.sandcastle.immerse.model.dto.ProfileImageDto;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

public interface ProfileImageService {

    @Transactional
    List<ProfileImageDto> findAllProfileImages();

    @Transactional
    Optional<ProfileImageDto> findByUserId(Long userId);
}
