package com.neighborconnect.controller;

import com.neighborconnect.dto.ReviewRequestDto;
import com.neighborconnect.dto.ReviewResponseDto;
import com.neighborconnect.entity.Review;
import com.neighborconnect.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/reviews")

public class ReviewController {
    @Autowired
    ReviewService service;

    @GetMapping
    public List<ReviewResponseDto> getAllReviews() {
        return service.getAllReviews();
    }

    @GetMapping("/{id}")
    public ReviewResponseDto getReviewById(@PathVariable Long id) {
        return service.getReviewById(id);
    }

    @PostMapping
    public ResponseEntity<ReviewResponseDto> addReview(@RequestBody ReviewRequestDto dto) {
        Review savedEntity = service.addReview(dto);
        return ResponseEntity.ok(service.convertToDto(savedEntity));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ReviewResponseDto> updateReview(@PathVariable Long id, @RequestBody ReviewRequestDto dto ) {
        return service.updateReview(id, dto);
    }

    // Delete Item (DELETE)
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteReview(@PathVariable Long id) {
        service.deleteReview(id);
        return ResponseEntity.ok("Deleted successfully");
    }
    // Delete All - for Testing when I want to restart !!!
    @DeleteMapping
    public ResponseEntity<String> deleteAll() {
        service.deleteAll();
        return ResponseEntity.ok("Deleted All Services successfully");
    }
}