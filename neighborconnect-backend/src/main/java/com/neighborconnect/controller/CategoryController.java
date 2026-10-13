package com.neighborconnect.controller;

import com.neighborconnect.dto.BusinessResponseDto;
import com.neighborconnect.dto.CategoryRequestDto;
import com.neighborconnect.dto.CategoryResponseDto;
import com.neighborconnect.entity.Category;
import com.neighborconnect.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/categories")

public class CategoryController {
    @Autowired
    CategoryService service;

    @GetMapping
    public List<CategoryResponseDto> getAllCategories() {
        return service.getAllCategories();
    }

    @GetMapping("/{id}")
    public CategoryResponseDto getCategoryById(@PathVariable Long id) {
        return service.getCategoryById(id);
    }

    @GetMapping("/{id}/businesses")
    public List<BusinessResponseDto> getBusinessesByCategoryId(@PathVariable Long id) {
        return service.getBusinessesByCategoryId(id);
    }

    @PostMapping
    public ResponseEntity<CategoryResponseDto> addCategory(@RequestBody CategoryRequestDto dto) {
        Category category = service.addCategory(dto);
        return ResponseEntity.ok(service.convertToDto(category));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CategoryResponseDto> updateCategory(@PathVariable Long id, @RequestBody CategoryRequestDto dto ) {
        return  service.updateCategory(id, dto);
    }

    // Delete Item (DELETE)
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCategory(@PathVariable Long id) {
        service.deleteCategory(id);
        return ResponseEntity.ok("Deleted successfully");
    }

    // Delete All - for Testing when I want to restart !!!
    @DeleteMapping
    public ResponseEntity<String> deleteAll() {
        service.deleteAll();
        return ResponseEntity.ok("Deleted All Categories successfully");
    }
}