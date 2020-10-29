package com.ath.tin.console.admin;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableEurekaClient
@SpringBootApplication
@EntityScan({"com.ath.tin.console.admin.commons.model.entity"})
@ComponentScan({"com.ath.tin.console.admin.controller","com.ath.tin.console.admin.model.service"})
@EnableJpaRepositories("com.ath.tin.console.admin.model.dao")
public class ConsoleAdminApplication {

	public static void main(String[] args) {
		SpringApplication.run(ConsoleAdminApplication.class, args);
	}

}
