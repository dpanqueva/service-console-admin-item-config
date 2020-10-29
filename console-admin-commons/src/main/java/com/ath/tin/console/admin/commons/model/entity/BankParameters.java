package com.ath.tin.console.admin.commons.model.entity;



import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "BANK_PARAMETERS")
public class BankParameters implements Serializable {

    private static final long serialVersionUID = 1L;

    @EmbeddedId
    protected BankParametersPK bankParametersPK;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 500)
    @Column(name = "PARAM_VALUE")
    private String paramValue;
    @Basic(optional = false)
    @NotNull
    @Column(name = "IS_ENCRYPT")
    private short isEncrypt;
}
