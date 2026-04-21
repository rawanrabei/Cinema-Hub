package com.example.demo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/v1")
public class TestController {

    @GetMapping("/welcome")
    public String allAccess() {
        return "everyone access";
    }

    @GetMapping("/user")
    public String userAccess() {
        return "User content with JWT";
    }

    @GetMapping("/special")
    public String specialAccess() {
        return "Special access with JWT";
    }

    @GetMapping("/hello")
        public String hello() {
        return "HELLO";
    }
}