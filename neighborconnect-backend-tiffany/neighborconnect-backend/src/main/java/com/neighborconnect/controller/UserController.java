package com.neighborconnect.controller;

import com.neighborconnect.dto.UserRequestDto;
import com.neighborconnect.dto.UserResponseDto;
import com.neighborconnect.entity.User;
import com.neighborconnect.repository.UserRepository;
import com.neighborconnect.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/users")

public class UserController {
    @Autowired
    UserService service;

    @GetMapping
    public List<UserResponseDto> getAllUsers() {
        return service.getAllUsers();
    }

    @GetMapping("/{id}")
    public UserResponseDto getUserById(@PathVariable Long id) {
        return service.getUserById(id);
    }

    @PostMapping
    public ResponseEntity<UserResponseDto> addUser(@RequestBody UserRequestDto userRequestDto) {
        User user = service.addUser(userRequestDto);
        return ResponseEntity.ok(service.convertToDto(user));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserResponseDto> updateUser(@PathVariable Long id, @RequestBody UserRequestDto userRequestDto ) {
        return  service.updateUser(id, userRequestDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        service.deleteUser(id);
        return ResponseEntity.ok("Deleted successfully");
    }

    @DeleteMapping
    public ResponseEntity<String> deleteAll() {
        service.deleteAll();
        return ResponseEntity.ok("Deleted All Users successfully");
    }

}
