package com.sandcastle.immerse.controller;

import com.sandcastle.immerse.model.dto.ImageFileDto;
import com.sandcastle.immerse.service.ImageFileServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/upload")
@RequiredArgsConstructor
public class ImageFileController {


    private final ImageFileServiceImpl imageFileService;

    @PostMapping(value = "", consumes = {"multipart/form-data"})
    public void saveFile(@RequestPart(name = "multipartFile") MultipartFile file)throws Exception{

        imageFileService.uploadImageFile(file);
    }
}
