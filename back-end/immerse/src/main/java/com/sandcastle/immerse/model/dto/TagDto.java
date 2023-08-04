package com.sandcastle.immerse.model.dto;

import com.sandcastle.immerse.model.entity.TagEntity;
import lombok.Builder;
import lombok.Data;

@Data
public class TagDto {
    private Long tagId;
    private String tagName;


    public TagDto(TagEntity tagEntity){
        tagId = tagEntity.getTagId();
        tagName = tagEntity.getTagName();
    }
}
