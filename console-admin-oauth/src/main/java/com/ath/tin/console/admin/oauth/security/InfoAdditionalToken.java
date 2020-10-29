package com.ath.tin.console.admin.oauth.security;


import com.ath.tin.console.admin.oauth.feign.client.UserFeignClient;
import com.ath.tin.console.admin.users.commons.model.entity.UserStandard;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.common.DefaultOAuth2AccessToken;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.token.TokenEnhancer;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class InfoAdditionalToken implements TokenEnhancer {

    @Autowired
    private UserFeignClient userFeignClient;

    @Override
    public OAuth2AccessToken enhance(OAuth2AccessToken accessToken, OAuth2Authentication authentication) {
        Map<String, Object> info = new HashMap<String,Object>();
        UserStandard userStandard = userFeignClient.findByUsername(authentication.getName());
        info.put("name", userStandard.getName());
        info.put("last_name", userStandard.getLastName());
        info.put("email", userStandard.getEmail());
        ((DefaultOAuth2AccessToken) accessToken).setAdditionalInformation(info);
        return accessToken;
    }
}
