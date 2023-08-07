package com.sandcastle.immerse.service;

import com.sandcastle.immerse.model.dto.FileDto;

import java.io.IOException;

public interface FileService {





    /**
     * SaveFile
     */
    void fileSave(FileDto fileDto) throws IOException;


    /**
     * GetFile
     */

}
