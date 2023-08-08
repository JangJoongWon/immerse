package com.sandcastle.immerse.model.dto;

import lombok.Builder;
import lombok.Data;

// 본재씨 다시 하는 용
@Data
@Builder
public class ShowTagDto {
    private Long showId;
    private Long tagId;
}
