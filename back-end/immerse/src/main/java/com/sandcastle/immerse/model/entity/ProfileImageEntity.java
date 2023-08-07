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

    @Column(name = "orginal_file_name")
    private String orginalFileName;

    @Column(name = "stored_file_name")
    private String fileName;


}
