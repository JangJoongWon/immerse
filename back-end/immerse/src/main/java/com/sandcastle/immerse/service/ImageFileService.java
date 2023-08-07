package com.sandcastle.immerse.service;

import com.sandcastle.immerse.model.dto.ImageFileDto;
import org.springframework.web.multipart.MultipartFile;

public interface ImageFileService {

    public void uploadImageFile(MultipartFile file) throws Exception;
}
