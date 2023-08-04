package com.sandcastle.immerse.model.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProfileImageDto {

    private Long id;
    private Long userId;

    private String fileName;
    private String contentType;

    private long size;
}
