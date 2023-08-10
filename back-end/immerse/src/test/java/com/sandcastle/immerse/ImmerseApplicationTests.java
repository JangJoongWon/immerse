package com.sandcastle.immerse;

import org.jasypt.encryption.pbe.PooledPBEStringEncryptor;
import org.jasypt.encryption.pbe.config.SimpleStringPBEConfig;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class ImmerseApplicationTests {

	@Test
	void contextLoads() {
	}
	@Value("${jasypt.encryptor.password")
	private String key;
	private String algorithm = "PBEWithMD5AndDES";

	@Test
	public void testEncryptionKey(){
		PooledPBEStringEncryptor encryptor = new PooledPBEStringEncryptor();
		SimpleStringPBEConfig config = new SimpleStringPBEConfig();
		config.setPassword(key);
		config.setAlgorithm(algorithm);
		config.setKeyObtentionIterations("1000");
		config.setPoolSize("1");
		config.setProviderName("SunJCE");
		config.setSaltGeneratorClassName("org.jasypt.salt.RandomSaltGenerator");
		config.setStringOutputType("base64");
		encryptor.setConfig(config);


		String plaintext = "root";
		System.out.println(plaintext + " ->  " +encryptor.encrypt(plaintext));
	}

}
