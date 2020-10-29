package com.ath.tin.console.admin.model.service;

import com.ath.tin.console.admin.commons.model.entity.BankParametersPK;
import com.ath.tin.console.admin.commons.model.entity.BankParameters;
import com.ath.tin.console.admin.model.dao.IBankParametersDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class BankParametersServiceImpl implements IBankParametersService {


    @Autowired
    private IBankParametersDao bankParametersDao;

    @Override
    @Transactional(readOnly = true)
    public List<BankParameters> findAll() {
        return bankParametersDao.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Page<BankParameters> findAll(Pageable pageable) {
        return bankParametersDao.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public BankParameters findById(BankParametersPK bankParametersPK) {
        return bankParametersDao.findById(bankParametersPK).orElse(null);
    }

    @Override
    @Transactional
    public BankParameters save(BankParameters bankParameters) {
        return bankParametersDao.save(bankParameters);
    }

    @Override
    @Transactional
    public void delete(BankParametersPK bankParametersPK) {
        bankParametersDao.deleteById(bankParametersPK);
    }
}
