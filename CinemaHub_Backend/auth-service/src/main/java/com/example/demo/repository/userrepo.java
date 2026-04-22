package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.User;

public interface userrepo extends JpaRepository<User , Long> {

   // User findByUser(String username);
    boolean existsByUsername(String username);
    User findByUsername(String username);
    boolean existsByEmail(String email);
    User findByEmail(String email);

}
