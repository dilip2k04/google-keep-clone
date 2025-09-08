package com.notes.notesapp.controller;

import java.util.Optional;
import org.springframework.web.bind.annotation.*;
import com.notes.notesapp.model.User;
import com.notes.notesapp.repository.UserRepository;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        Optional<User> existing = userRepository.findByUsername(user.getUsername());
        if (existing.isPresent()) throw new RuntimeException("Username already exists");
        return userRepository.save(user);
    }

    @PostMapping("/login")
    public User login(@RequestBody User user) {
        Optional<User> existing = userRepository.findByUsername(user.getUsername());
        if (existing.isPresent() && existing.get().getPassword().equals(user.getPassword())) {
            return existing.get();
        } else {
            throw new RuntimeException("Invalid credentials");
        }
    }
}
