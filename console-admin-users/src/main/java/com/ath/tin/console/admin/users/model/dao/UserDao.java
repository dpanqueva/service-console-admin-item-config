package com.ath.tin.console.admin.users.model.dao;


import com.ath.tin.console.admin.users.commons.model.entity.UserStandard;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

@RepositoryRestResource(path = "admin")
public interface UserDao extends PagingAndSortingRepository<UserStandard, Long> {

    @RestResource(path = "find-username")
    public UserStandard findByUsername(@Param("username") String username);

}
