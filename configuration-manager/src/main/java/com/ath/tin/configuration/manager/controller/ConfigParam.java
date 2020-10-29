package com.ath.tin.configuration.manager.controller;

import com.ath.tin.configuration.manager.component.GeneralProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("conf")
public class ConfigParam {

    @Autowired
    private GeneralProperties prop;

    @GetMapping("ver/{prop}")
    public String findValue(@PathVariable String pro) {
        String propiedadStr = prop.findValue(pro);
        return propiedadStr;
    }


}
