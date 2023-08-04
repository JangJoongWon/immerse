package com.sandcastle.immerse.model.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
@Table(name = "profile_images")
public class ProfileImageEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(targetEntity = UserEntity.class , fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity userEntity;

    private String fileName;

    private String contentType;

    private long size;

    // 기타 필드들...

    // Getter, Setter, 등등...
}
