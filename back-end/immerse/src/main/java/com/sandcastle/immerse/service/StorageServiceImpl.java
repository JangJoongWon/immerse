package com.sandcastle.immerse.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.util.IOUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;


@Service
public class StorageServiceImpl {

    private String bucketName = "bucketName";
    @Autowired
    private AmazonS3 s3Client;

    @Autowired
    private ImageFileServiceImpl imageFileService;

    public String uploadFile(MultipartFile file){
        File fileObj = convertMultiPartFileToFile(file);
        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        s3Client.putObject(new PutObjectRequest("bucketName", fileName, fileObj));
        fileObj.delete();



        return s3Client.getUrl("bucketName", fileName).toString();
    }

    public byte[] downloadFile(String fileName){
        S3Object s3Object = s3Client.getObject("bucketName", fileName);
        S3ObjectInputStream inputStream = s3Object.getObjectContent();
        try{
            byte[] content = IOUtils.toByteArray(inputStream);
            return content;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    public String deleteFile(String fileName){
        s3Client.deleteObject("bucketName", fileName);
        return fileName + " removed ...";
    }



    private File convertMultiPartFileToFile(MultipartFile file){
        File converedFile = new File(file.getOriginalFilename());
        try (FileOutputStream fos = new FileOutputStream(converedFile)){
            fos.write(file.getBytes());
        } catch (Exception e) {
            e.printStackTrace();
        }
        return converedFile;
    }
}
