package com.neighborconnect.controller;

import com.neighborconnect.dto.BusinessRequestDto;
import com.neighborconnect.dto.BusinessResponseDto;
import com.neighborconnect.entity.Business;
import com.neighborconnect.service.BusinessService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/businesses")

public class BusinessController {
    @Autowired
    BusinessService service;

    @GetMapping
    public List<BusinessResponseDto> getAllBusinesss() {
        return service.getAllBusinesses();
    }

    @GetMapping("/{id}")
    public BusinessResponseDto getBusinessById(@PathVariable Long id) {
        return service.getBusinessById(id);
    }

    @PostMapping
    public ResponseEntity<BusinessResponseDto> addBusiness(@Valid @RequestBody BusinessRequestDto businessRequestDto) {
        Business business = service.addBusiness(businessRequestDto);
        return ResponseEntity.ok(service.convertToDto(business));
    }

    @PutMapping("/{id}")
    public ResponseEntity<BusinessResponseDto> updateBusiness(@PathVariable Long id, @Valid @RequestBody BusinessRequestDto businessRequestDto ) {
        return  service.updateBusiness(id, businessRequestDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBusiness(@PathVariable Long id) {
        service.deleteBusiness(id);
        return ResponseEntity.ok("Deleted successfully");
    }

    @DeleteMapping
    public ResponseEntity<String> deleteAll() {
        service.deleteAll();
        return ResponseEntity.ok("Deleted All Businesss successfully");
    }

}
