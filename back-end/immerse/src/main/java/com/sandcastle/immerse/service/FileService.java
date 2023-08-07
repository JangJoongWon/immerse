package com.sandcastle.immerse.service;

import com.sandcastle.immerse.model.dto.FileDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface FileService {





    /**
     * SaveFile
     */
    void fileSave(MultipartFile request) throws IOException;


    /**
     * GetFile
     */
    MultipartFile fileLoad(String fileName) throws Exception;
}
