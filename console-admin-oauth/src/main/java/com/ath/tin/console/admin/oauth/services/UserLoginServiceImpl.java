package com.ath.tin.console.admin.oauth.services;

import com.ath.tin.console.admin.oauth.feign.client.UserFeignClient;
import com.ath.tin.console.admin.users.commons.model.entity.UserStandard;
import feign.FeignException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserLoginServiceImpl implements IUserLoginService, UserDetailsService {

    private Logger logger = LoggerFactory.getLogger(UserLoginServiceImpl.class);

    @Autowired
    private UserFeignClient userFeignClient;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        try {
            UserStandard userStandard = userFeignClient.findByUsername(username);
            List<GrantedAuthority> authorities = userStandard.getRoleStandards()
                    .stream().map(role -> new SimpleGrantedAuthority(role.getName()))
                    .peek(authority -> logger.info("Role: " + authority.getAuthority()))
                    .collect(Collectors.toList());
            logger.info("User logged " + username);
            return new User(userStandard.getUsername(), userStandard.getPassword()
                    , userStandard.getEnabled(), true, true, true, authorities);
        } catch (FeignException e) {
            String message = "Error login, don't exist user in the system";
            logger.error(message);
            throw new UsernameNotFoundException(message);
        }
    }

    @Override
    public UserStandard findByUsername(String username) {
        return userFeignClient.findByUsername(username);
    }
}
