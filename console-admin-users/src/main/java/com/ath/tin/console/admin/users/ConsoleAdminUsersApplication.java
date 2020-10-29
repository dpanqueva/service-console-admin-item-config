package com.ath.tin.console.admin.users;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan({"com.ath.tin.console.admin.users.commons.model.entity"})
@ComponentScan({"com.ath.tin.console.admin.users.conf"})
@EnableJpaRepositories("com.ath.tin.console.admin.users.model.dao")
public class ConsoleAdminUsersApplication {

	public static void main(String[] args) {
		SpringApplication.run(ConsoleAdminUsersApplication.class, args);
	}

}
