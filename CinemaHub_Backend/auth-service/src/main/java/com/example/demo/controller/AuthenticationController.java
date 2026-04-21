package com.example.demo.controller;

import com.example.demo.entity.User;
import com.example.demo.repository.userrepo;
import com.example.demo.security.JwtUtil;

//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthenticationController {

    private AuthenticationManager authenticationManager;
    private userrepo userRepository;
    private PasswordEncoder encoder;
    private JwtUtil jwtUtils;

    //@Autowired
    public AuthenticationController(
        AuthenticationManager authenticationManager,
        userrepo userRepository,
        PasswordEncoder encoder,
        JwtUtil jwtUtils
    ){
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.encoder = encoder;
        this.jwtUtils = jwtUtils;
    }

    @PostMapping("/signin")
    public String authenticateUser(@RequestBody User user) {

        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                user.getUsername(),
                user.getPassword()
        ));

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        return jwtUtils.generateToken(userDetails.getUsername());
    }

    @PostMapping("/signup")
    public String registerUser(@RequestBody User user) {

        if (userRepository.existsByUsername(user.getUsername()))
            return "User already exists!";

        User newUser = new User();
        newUser.setUsername(user.getUsername());
        newUser.setPassword(encoder.encode(user.getPassword()));

        userRepository.save(newUser);

        return "User registered successfully!";
    }
}