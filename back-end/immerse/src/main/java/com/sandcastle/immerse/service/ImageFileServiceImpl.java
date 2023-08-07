package com.sandcastle.immerse.service;

import com.sandcastle.immerse.model.dto.ImageFileDto;
import com.sandcastle.immerse.model.dto.TagDto;
import com.sandcastle.immerse.model.entity.ImageFileEntity;
import com.sandcastle.immerse.repository.ImageFileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;

@Service
@RequiredArgsConstructor
public class ImageFileServiceImpl implements ImageFileService{

    private final ImageFileRepository imageRepository;
    @Override
    public void uploadImageFile(MultipartFile file) throws Exception{

        //Path 바꿔야 함!!!!!!!
        String path = System.getProperty("user.dir") + "/src/main/resources/files";

        String fileName = System.currentTimeMillis()+"_"+file.getName();

        File saveFile = new File(path , fileName);

        file.transferTo(saveFile);

        ImageFileEntity imageFileEntity = new ImageFileEntity(fileName, path);

        imageRepository.save(imageFileEntity);

    }
}
