package com.sandcastle.immerse.model.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ShowTagDto {
    private Long showId;
    private Long tagId;
}
