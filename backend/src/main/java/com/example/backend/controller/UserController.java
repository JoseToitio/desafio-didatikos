package com.example.backend.controller;


import com.example.backend.dto.CreateUserDto;
import com.example.backend.dto.LoginDto;
import com.example.backend.dto.UserResponseDto;
import com.example.backend.entitities.User;
import com.example.backend.exceptions.UserException;
import com.example.backend.repositories.UserRepository;
import com.example.backend.security.JwtTokenService;
import com.example.backend.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;
    private final UserRepository userRepository;
    private final JwtTokenService jwtTokenService;

    public UserController(UserService userService, UserRepository userRepository, JwtTokenService jwtTokenService) {
        this.userService = userService;
        this.userRepository = userRepository;
        this.jwtTokenService = jwtTokenService;
    }

    //register user
    @PostMapping
    public ResponseEntity<UserResponseDto> register(@RequestBody CreateUserDto dto) {
        return ResponseEntity.ok(userService.createUser(dto));
    }

    //login user
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody LoginDto dto) {
        String token = userService.authenticate(dto);
        return ResponseEntity.ok(Collections.singletonMap("token", token));
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User user) {
        return ResponseEntity.ok(userService.updateUser(id, user));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponseDto> getUserInfo(@RequestHeader("Authorization") String token) {
        try {
            String cpf = jwtTokenService.getCpfFromToken(token.replace("Bearer ", ""));
            User user = userRepository.findByCpf(cpf)
                    .orElseThrow(() -> new UserException("Usuário não encontrado"));
            UserResponseDto userDto = new UserResponseDto(user.getId(), user.getName(), user.getCpf(), user.getRole());
            return ResponseEntity.ok(userDto);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }

}
