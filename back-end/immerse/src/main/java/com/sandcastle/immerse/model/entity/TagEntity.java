package com.sandcastle.immerse.model.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "tags")
public class TagEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JoinColumn(name = "tag_id")
    private Long tagId;

    @Column(name = "tag_name" , length = 30, unique = true)
    private String tagName;

    @Builder
    public TagEntity(Long tagId , String tagName){
        this.tagId = tagId;
        this.tagName = tagName;
    }
}
