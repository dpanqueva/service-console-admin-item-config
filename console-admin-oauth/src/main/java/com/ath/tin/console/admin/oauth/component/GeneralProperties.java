package com.ath.tin.console.admin.oauth.component;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
@PropertySource(value = {"file:${PATH_CONFIG_CORE_TIN}/application-security-${spring.profiles.active}.properties"}, encoding = "UTF-8")
public class GeneralProperties {

    @Autowired
    private Environment env;

    private Map<String, String> propertiesEnv;

    public GeneralProperties() {
        propertiesEnv = new HashMap<>();
    }

    public String findValue(String value) {
        String findValueStr = env.getProperty(value) == null ? propertiesEnv.get(value) : env.getProperty(value);
        return findValueStr;
    }

    public void setPropertiesEnv(Map<String, String> propertiesEnv) {
        this.propertiesEnv = propertiesEnv;
    }
}
