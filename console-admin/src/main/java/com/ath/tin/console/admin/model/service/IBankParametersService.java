package com.ath.tin.console.admin.model.service;

import com.ath.tin.console.admin.commons.model.entity.BankParametersPK;
import com.ath.tin.console.admin.commons.model.entity.BankParameters;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IBankParametersService {

    public List<BankParameters> findAll();

    public Page<BankParameters> findAll(Pageable pageable);

    public BankParameters findById(BankParametersPK bankParametersPK);

    public BankParameters save(BankParameters bankParameters);

    public void delete(BankParametersPK bankParametersPK);
}
