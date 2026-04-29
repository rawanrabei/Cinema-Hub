package com.example.demo.controller;

import com.example.demo.entity.User;
import com.example.demo.repository.userrepo;
import com.example.demo.security.JwtUtil;
import com.example.demo.producer.AuthProducer;

//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

    private AuthenticationManager authenticationManager;
    private userrepo userRepository;
    private PasswordEncoder encoder;
    private JwtUtil jwtUtils;
    private AuthProducer authProducer;

    //@Autowired
    public AuthenticationController(
        AuthenticationManager authenticationManager,
        userrepo userRepository,
        PasswordEncoder encoder,
        JwtUtil jwtUtils,
        AuthProducer authProducer
    ){
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.encoder = encoder;
        this.jwtUtils = jwtUtils;
        this.authProducer = authProducer;
    }

    @PostMapping("/login")
    public String authenticateUser(@RequestBody User user) {

        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                user.getEmail(),
                user.getPassword()
        ));

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        
        // Get user role from database
        User dbUser = userRepository.findByEmail(user.getEmail());
        if (dbUser == null) {
            throw new RuntimeException("User not found");
        }
        
        String token = jwtUtils.generateToken(userDetails.getUsername(), dbUser.getRole().toString(), dbUser.getId());

        // Send user logged in event to Kafka
        authProducer.sendUserLoggedInEvent(user);

        return token;
    }

    @PostMapping("/register")
    public String registerUser(@RequestBody User user) {

        if (userRepository.existsByEmail(user.getEmail()))
            return "User already exists!";

        User newUser = new User();
        newUser.setUsername(user.getUsername());
        newUser.setEmail(user.getEmail());
        newUser.setPassword(encoder.encode(user.getPassword()));
        // Use role from request, default to USER if not provided
        if (user.getRole() != null) {
            newUser.setRole(user.getRole());
        } else {
            newUser.setRole(User.Role.USER);
        }

        User savedUser = userRepository.save(newUser);

        // Send user registered event to Kafka
        authProducer.sendUserRegisteredEvent(savedUser);

        return "User registered successfully!";
    }

    @GetMapping("/profile")
    public User getUserProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new RuntimeException("User not found");
        }
        // Don't return password in response
        user.setPassword(null);
        return user;
    }

    @PostMapping("/logout")
    public String logoutUser() {
        SecurityContextHolder.clearContext();
        return "User logged out successfully!";
    }

    @GetMapping("/users")
    public java.util.List<User> getAllUsers() {
        java.util.List<User> users = userRepository.findAll();
        // Don't return passwords in response
        users.forEach(user -> user.setPassword(null));
        return users;
    }
}