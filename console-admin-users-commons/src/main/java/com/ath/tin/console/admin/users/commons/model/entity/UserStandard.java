package com.ath.tin.console.admin.users.commons.model.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "USERS_CONSOLE")
public class UserStandard implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_USER")
    @SequenceGenerator(sequenceName = "SEQ_USER", allocationSize = 1, name = "SEQ_USER")
    private Long id;
    //@GeneratedValue(strategy = GenerationType.IDENTITY)

    @Column(unique = true, length = 20, name = "USER_NAME")
    private String username;

    @Column(length = 60, name = "PASS")
    private String password;

    @Column(name = "ENABLED")
    private Boolean enabled;

    @Column(name = "NAME")
    private String name;

    @Column(name = "LAST_NAME")
    private String lastName;

    @Column(unique = true, length = 300, name = "EMAIL")
    private String email;

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(name = "USERS_TO_ROLES", joinColumns = @JoinColumn(name = "USER_ID")
            , inverseJoinColumns = @JoinColumn(name = "ROLE_ID"), uniqueConstraints = {
            @UniqueConstraint(columnNames = {"USER_ID", "ROLE_ID"})})
    private List<RoleStandard> roleStandards;


}
