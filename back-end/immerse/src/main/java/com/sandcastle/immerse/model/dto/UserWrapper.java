package com.sandcastle.immerse.model.dto;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

@Data
@Getter
@Builder
public class UserWrapper {
    private UserDto userDto;
    private MultipartFile bannerFile;
    private MultipartFile profileFile;
}
