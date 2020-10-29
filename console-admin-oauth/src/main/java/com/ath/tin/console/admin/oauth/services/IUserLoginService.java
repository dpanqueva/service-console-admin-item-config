package com.ath.tin.console.admin.oauth.services;

import com.ath.tin.console.admin.users.commons.model.entity.UserStandard;

public interface IUserLoginService {

    public UserStandard findByUsername(String username);
}
