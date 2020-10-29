package com.ath.tin.console.admin.users.conf;

import com.ath.tin.console.admin.users.commons.model.entity.RoleStandard;
import com.ath.tin.console.admin.users.commons.model.entity.UserStandard;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;

@Configuration
public class RepositoryConfig implements RepositoryRestConfigurer {


    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        config.exposeIdsFor(UserStandard.class, RoleStandard.class);
    }
}
