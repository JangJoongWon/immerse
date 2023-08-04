package com.sandcastle.immerse.controller;

import com.sandcastle.immerse.model.dto.ProfileImageDto;
import com.sandcastle.immerse.service.ProfileImageServiceImpl;
import com.sandcastle.immerse.service.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/upload")
public class ProfileImageController {

    private final ProfileImageServiceImpl profileImageService;
    private final UserServiceImpl userService;

    @PostMapping("/upload/")
    public ResponseEntity<String> uploadImageFile(@RequestParam("file") MultipartFile file) {
        // 이미지 파일 업로드 기능 구현 (ImageService와 함께 사용)

        // 예시로 성공 메시지 반환
        return ResponseEntity.ok("File uploaded successfully.");
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
//
//@RestController
//public class ImageFileController {
//
//    private final ImageService imageService;
//
//    public ImageFileController(ImageService imageService) {
//        this.imageService = imageService;
//    }
//
//    @PostMapping("/upload")
//    public ResponseEntity<String> uploadImageFile(@RequestParam("file") MultipartFile file) {
//        // 이미지 파일 업로드 기능 구현 (ImageService와 함께 사용)
//
//        // 예시로 성공 메시지 반환
//        return ResponseEntity.ok("File uploaded successfully.");
//    }
//
//    @GetMapping("/images")
//    public ResponseEntity<List<ImageFileDTO>> getAllImageFiles() {
//        List<ImageFileDTO> imageFiles = imageService.getAllImageFiles();
//        return ResponseEntity.ok(imageFiles);
//    }
//
//    @GetMapping("/images/{userId}")
//    public ResponseEntity<ImageFileDTO> getImageFileByUserId(@PathVariable Long userId) {
//        ImageFileDTO imageFile = imageService.getImageFileByUserId(userId);
//        if (imageFile == null) {
//            return ResponseEntity.notFound().build();
//        }
//        return ResponseEntity.ok(imageFile);
//    }
//}