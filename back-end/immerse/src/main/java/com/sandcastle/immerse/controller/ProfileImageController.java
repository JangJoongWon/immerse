package com.sandcastle.immerse.controller;

import com.sandcastle.immerse.model.dto.ProfileImageDto;
import com.sandcastle.immerse.service.ProfileImageServiceImpl;
import com.sandcastle.immerse.service.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/upload")
public class ProfileImageController {

    private final ProfileImageServiceImpl profileImageService;
    private final UserServiceImpl userService;

//    @Value("${upload.dir}") // application.properties에서 저장 경로를 설정하는 변수
    private String uploadDir = "src/main/resources/images";
    @PostMapping("/")
    public ResponseEntity<String> uploadImageFile(@RequestParam("file") MultipartFile file) {

        // 이미지 파일 업로드 기능 구현 (ImageService와 함께 사용)
        try {
            // 업로드 디렉토리 생성 (없는 경우)
            File directory = new File(uploadDir);
            if (!directory.exists()) {
                directory.mkdirs();
            }

            // 파일 저장 경로 생성
            String fileName = file.getOriginalFilename();
            String filePath = uploadDir + File.separator + fileName;
            Path path = Paths.get(filePath);

            // 파일 저장
            Files.write(path, file.getBytes());

            // 업로드 성공 메시지 반환
            return ResponseEntity.ok("File uploaded successfully.");
        } catch (IOException e) {
            // 업로드 실패 메시지 반환
            return ResponseEntity.badRequest().body("Failed to upload the file.");
        }
    }


    @GetMapping("/images")
    public ResponseEntity<List<ProfileImageDto>> getAllImageFiles() {
        List<ProfileImageDto> imageFiles = profileImageService.findAllProfileImages();
        return ResponseEntity.ok(imageFiles);
    }

    @GetMapping("/images/{userId}")
    public ResponseEntity<Optional<ProfileImageDto>> getImageFileByUserId(@PathVariable Long userId) {
        Optional<ProfileImageDto> imageFile = profileImageService.findByUserId(userId);
        if (imageFile.isPresent()) {
            return ResponseEntity.ok(imageFile);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}