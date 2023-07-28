package com.sandcastle.immerse;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
public class ImmerseApplication {

	public static void main(String[] args) {
		SpringApplication.run(ImmerseApplication.class, args);
	}


}
