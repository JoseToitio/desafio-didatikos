package com.example.backend.repositories;

import com.example.backend.entitities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByCpf(String cpf);

    boolean existsByCpf(String cpf);
}