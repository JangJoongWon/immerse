package com.sandcastle.immerse.model.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Getter
@NoArgsConstructor
@Table (name = "shows_tags")
public class ShowTagEntity {

    @Id
    @Column(name = "show_tag_id" , nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long showTagId;

    @NotNull
    @ManyToOne(targetEntity = TagEntity.class ,fetch = FetchType.LAZY)
    @JoinColumn(name = "tag_id" , nullable = false)
    private TagEntity tagEntity;

    @NotNull
    @ManyToOne(targetEntity = ShowEntity.class , fetch = FetchType.LAZY)
    @JoinColumn(name = "show_id" , nullable = false)
    private ShowEntity showEntity;
}
