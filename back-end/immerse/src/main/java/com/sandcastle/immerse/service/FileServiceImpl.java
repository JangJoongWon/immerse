package com.sandcastle.immerse.service;

import com.sandcastle.immerse.model.dto.FileDto;
import com.sandcastle.immerse.model.entity.FileEntity;
import com.sandcastle.immerse.repository.FileRepository;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@Service
@RequiredArgsConstructor
public class FileServiceImpl implements FileService{

    FileRepository fileRepository;
    @Override
    public void fileSave(MultipartFile request) throws IOException {
        String originalFilename = request.getOriginalFilename();
        String storedFilename = System.currentTimeMillis() +"_" +originalFilename;

        //파일 경로 해야 하는데 AWS 에서 파일 경로 설정
        String savePath = "/home/ubuntu/files/images";

        // 로컬까지의 파일 저장
        request.transferTo(new File(savePath,storedFilename));

        // DB 에 입력하여 위치 지정
        FileEntity fileEntity = FileEntity.builder()
                .originalFileName(originalFilename)
                .storedFileName(storedFilename)
                .build();

        fileRepository.save(fileEntity);

    }
    @Override
    public MultipartFile fileLoad(String fileName) throws Exception {

        return null;
    }
}
