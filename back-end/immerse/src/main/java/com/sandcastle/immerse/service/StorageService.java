package com.sandcastle.immerse.service;

import org.springframework.web.multipart.MultipartFile;

public interface StorageService {
    public String uploadFile(MultipartFile file);

    public byte[] downloadFile(String fileName);

    public String deleteFile(String fileName);
}
