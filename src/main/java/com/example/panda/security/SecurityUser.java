package com.example.panda.security;

import com.example.panda.dto.UserDTO;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;

@Slf4j
@Getter
@Setter
public class SecurityUser extends User {

    private UserDTO user;

    public SecurityUser(UserDTO user) {
        super(user.getEmail(), user.getPassword(), AuthorityUtils.createAuthorityList(user.getAuthority().toString()));

        log.info("SecurityUser member.username = {}", user.getEmail());
        log.info("SecurityUser member.password = {}", user.getPassword());
        log.info("SecurityUser member.role = {}", user.getAuthority().toString());

        this.user = user;
    }
}
