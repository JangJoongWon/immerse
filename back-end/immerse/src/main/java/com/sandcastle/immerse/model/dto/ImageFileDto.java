package com.sandcastle.immerse.model.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ImageFileDto {
    private Long imageId;

    private String imageName;

    private String imagePath;

}
