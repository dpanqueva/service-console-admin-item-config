package com.ath.tin.console.admin.model.dao;

import com.ath.tin.console.admin.commons.model.entity.BankParametersPK;
import com.ath.tin.console.admin.commons.model.entity.BankParameters;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IBankParametersDao extends JpaRepository<BankParameters, BankParametersPK> {
}
