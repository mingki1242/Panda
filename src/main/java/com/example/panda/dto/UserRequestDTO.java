package com.example.panda.dto;

import com.example.panda.entity.Authority;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRequestDTO {
    private String email;

    private String password;

    Authority authority;
}
