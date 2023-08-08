package com.sandcastle.immerse.service;

import com.sandcastle.immerse.model.dto.ImageFileDto;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;

public interface ImageFileService {

    @Transactional
    public Long uploadImageFile(MultipartFile file) throws Exception;
}
