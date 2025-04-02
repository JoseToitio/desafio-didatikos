package com.example.backend.dto;

import com.example.backend.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserResponseDto {
    private Long id;
    private String name;
    private String cpf;
    private Role role;
}