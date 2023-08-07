package com.sandcastle.immerse.controller;

import com.sandcastle.immerse.model.dto.TagDto;
import com.sandcastle.immerse.model.entity.TagEntity;
import com.sandcastle.immerse.service.TagServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/tag")
@RequiredArgsConstructor
public class TagController {
    private final TagServiceImpl tagService;

    @PostMapping("/")
    public Long postTag(@RequestBody TagDto tagDto){
        tagService.createTag(tagDto);
        return tagDto.getTagId();
    }

    @GetMapping("/all")
    public ResponseEntity<?> getTags(){
        return ResponseEntity.ok(tagService.findallTag());
    }

    @GetMapping("/id/{tagId}")
    public Optional<TagDto> getTagById(@PathVariable Long tagId){
        Optional<TagDto> result = tagService.findById(tagId);
        return result;
    }

    @GetMapping("/name/{tagName}")
    public Optional<TagDto> getTagByName(@PathVariable String tagName){
        Optional<TagDto> result = tagService.findByName(tagName);
        return result;
    }

    @GetMapping("/show/{showId}")
    public List<TagDto> getTagsByShowId(@PathVariable Long showId){
        return tagService.findByShowId(showId);
    }

}
