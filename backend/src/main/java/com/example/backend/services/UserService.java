package com.example.backend.services;

import com.example.backend.dto.CreateUserDto;
import com.example.backend.dto.UserResponseDto;
import com.example.backend.dto.LoginDto;

import com.example.backend.entitities.User;
import com.example.backend.exceptions.UserException;
import com.example.backend.repositories.UserRepository;

import com.example.backend.security.JwtTokenService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenService jwtTokenService;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtTokenService jwtTokenService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenService = jwtTokenService;
    }

    public UserResponseDto createUser(CreateUserDto dto) {
        if (userRepository.existsByCpf(dto.getCpf())) {
            throw new UserException("CPF já cadastrado!");
        }
        User user = new User();
        user.setName(dto.getName());
        user.setCpf(dto.getCpf());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setRole(dto.getRole());

        userRepository.save(user);
        return new UserResponseDto(user.getId(), user.getName(), user.getCpf(), user.getRole());
    }

    public String authenticate(LoginDto dto) {
        Optional<User> user = userRepository.findByCpf(dto.getCpf());
        if (user.isEmpty() || !passwordEncoder.matches(dto.getPassword(), user.get().getPassword())) {
            throw new UserException("Credenciais inválidas");
        }
        return jwtTokenService.generateToken(user.get().getCpf());
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User updateUser(Long id, User user) {
        User existingUser = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        existingUser.setName(user.getName());
        existingUser.setCpf(user.getCpf());
        existingUser.setRole(user.getRole());
        if (user.getPassword() != null && !user.getPassword().isEmpty()) {
            existingUser.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        return userRepository.save(existingUser);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
