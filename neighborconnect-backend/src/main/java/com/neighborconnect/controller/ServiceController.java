package com.neighborconnect.controller;

import com.neighborconnect.dto.ServiceRequestDto;
import com.neighborconnect.dto.ServiceResponseDto;
import com.neighborconnect.entity.Service;
import com.neighborconnect.repository.ServiceRepository;
import com.neighborconnect.service.ServiceService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/services")

public class ServiceController {
    @Autowired
    ServiceService service;

    @GetMapping
    public List<ServiceResponseDto> getAllServices() {
        return service.getAllServices();
    }

    @GetMapping("/{id}")
    public ServiceResponseDto getServiceById(@PathVariable Long id) {
        return service.getServiceById(id);
    }

    @PostMapping
    public ResponseEntity<ServiceResponseDto> addService(@RequestBody ServiceRequestDto dto) {
        Service entity = service.addService(dto);
        return ResponseEntity.ok(service.convertToDto(entity));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ServiceResponseDto> updateService(@PathVariable Long id, @RequestBody ServiceRequestDto dto ) {
        return service.updateService(id, dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteService(@PathVariable Long id) {
        service.deleteService(id);
        return ResponseEntity.ok("Deleted successfully");
    }

    @DeleteMapping
    public ResponseEntity<String> deleteAll() {
        service.deleteAll();
        return ResponseEntity.ok("Deleted All Services successfully");
    }
}