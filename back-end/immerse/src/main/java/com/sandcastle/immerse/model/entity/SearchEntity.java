package com.sandcastle.immerse.model.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "search_histories")
public class SearchEntity {

    @Id
    @Column(name = "search_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long searchId;

    @NotNull
    @Column(name = "search_time")
    private LocalDateTime searchTime;

    @NotNull
    @Column(name = "search_content")
    private String searchContent;

    // 단방향 ManyToOne
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity userEntity;

    @Builder
    public SearchEntity(LocalDateTime searchTime, String searchContent, UserEntity userEntity) {
        this.searchTime = searchTime;
        this.searchContent = searchContent;
        this.userEntity = userEntity;
    }
}
