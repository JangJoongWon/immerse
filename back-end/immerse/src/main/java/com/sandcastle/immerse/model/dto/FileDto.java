package com.sandcastle.immerse.model.dto;

import lombok.Builder;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
@Builder
public class FileDto {

    private String orignalFileName;

    private String storedFileNane;

    private MultipartFile file;

    private int fileAttached;
}
