package com.example.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * OCL Constraints for User Entity:
 * 
 * context User inv:
 *   self.username.size() >= 3 and self.username.size() <= 50
 *   self.email.matches('^[A-Za-z0-9+_.-]+@(.+)$')
 *   self.password.size() >= 8
 *   self.password.matches('.*[A-Z].*') and self.password.matches('.*[a-z].*')
 *   self.password.matches('.*[0-9].*') and self.password.matches('.*[!@#$%^&*].*')
 *   self.role <> null
 * 
 * context User::register() : Boolean
 *   pre: self.username.size() >= 3 and self.email.matches('^[A-Za-z0-9+_.-]+@(.+)$')
 *   post: self.id <> null and self.role = Role.USER
 */
@Entity
@Data
@NoArgsConstructor
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * OCL: self.username.size() >= 3 and self.username.size() <= 50
     */
    @Column(unique = true, nullable = false, length = 50)
    private String username;

    /**
     * OCL: self.email.matches('^[A-Za-z0-9+_.-]+@(.+)$')
     */
    @Column(unique = true, nullable = false)
    private String email;

    /**
     * OCL: self.password.size() >= 8
     * OCL: self.password.matches('.*[A-Z].*') and self.password.matches('.*[a-z].*')
     * OCL: self.password.matches('.*[0-9].*') and self.password.matches('.*[!@#$%^&*].*')
     */
    @Column(nullable = false)
    private String password;

    /**
     * OCL: self.role <> null
     */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role = Role.USER;

    public enum Role {
        ADMIN, MANAGER, USER
    }
}
