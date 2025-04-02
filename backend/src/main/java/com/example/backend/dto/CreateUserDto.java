package com.example.backend.dto;

import com.example.backend.enums.Role;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateUserDto {
    private String name;
    private String cpf;
    private String password;
    private Role role;
}