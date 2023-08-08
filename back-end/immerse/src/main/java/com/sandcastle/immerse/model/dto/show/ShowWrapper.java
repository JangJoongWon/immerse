package com.sandcastle.immerse.model.dto.show;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

@Data
@Getter
@Builder
public class ShowWrapper {
    private ShowRequest form;
    private MultipartFile file;
}
