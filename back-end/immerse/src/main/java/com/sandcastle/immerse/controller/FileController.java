package com.sandcastle.immerse.controller;

import com.sandcastle.immerse.service.FileServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@RestController
@RequestMapping("/files")
public class FileController {

    private final FileServiceImpl fileService;

    @PostMapping("/upload")
    public String uploadFile(MultipartFile file) throws Exception{
        fileService.fileSave(file);
        System.out.println("file_upload!!!!");
        return file.getOriginalFilename();
    }
}
