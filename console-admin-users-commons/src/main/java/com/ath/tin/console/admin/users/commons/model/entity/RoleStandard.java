package com.ath.tin.console.admin.users.commons.model.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "ROLES_CONSOLE")
public class RoleStandard implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private Long id;

    @Column(unique=true, length=30, name = "NAME")
    private String name;

}
