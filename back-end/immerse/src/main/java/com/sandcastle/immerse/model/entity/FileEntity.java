package com.sandcastle.immerse.model.entity;

import com.sandcastle.immerse.model.dto.FileDto;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.File;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "file")
public class FileEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "original_file_name")
    private String originalFileName;

    @Column(name = "stored_file_name")
    private String storedFileName;


    @Builder
    public FileEntity(Long id, String originalFileName, String storedFileName){
        this.id = id;
        this.originalFileName = originalFileName;
        this.storedFileName = storedFileName;
    }

}


