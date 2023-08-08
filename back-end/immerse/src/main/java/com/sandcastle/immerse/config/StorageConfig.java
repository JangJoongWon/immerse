package com.sandcastle.immerse.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class StorageConfig {

    @Value("${cloud.aws.credentials.access-key}")
    private String accessKey;

    @Value("${cloud.aws.credentials.secret-key}")
    private String accessSecret;

    @Value("${cloud.aws.credentials.static}")
    private String region;




}
