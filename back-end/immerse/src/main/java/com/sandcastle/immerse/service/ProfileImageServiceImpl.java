package com.sandcastle.immerse.service;

import com.sandcastle.immerse.model.dto.ProfileImageDto;
import com.sandcastle.immerse.repository.ProfileImageRepository;
import com.sandcastle.immerse.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProfileImageServiceImpl implements ProfileImagesService{

    private final ProfileImageRepository profileImageRepository;
    private final UserRepository userRepository;
    @Override
    public List<ProfileImageDto> findAllProfileImages() {
        return profileImageRepository.getAllProfileImages();
    }

    @Override
    public Optional<ProfileImageDto> findByUserId(Long userId) {
        return Optional.ofNullable(profileImageRepository.getImageFileByUserId(userId));
    }
}
