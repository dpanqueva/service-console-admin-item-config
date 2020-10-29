package com.ath.tin.console.admin.oauth.feign.client;

import com.ath.tin.console.admin.users.commons.model.entity.UserStandard;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "service-console-admin-users")
public interface UserFeignClient {

    @GetMapping("/admin/search/find-username")
    public UserStandard findByUsername(@RequestParam String username);
}
