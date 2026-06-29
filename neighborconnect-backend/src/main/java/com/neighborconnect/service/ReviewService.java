package com.neighborconnect.service;

import com.neighborconnect.dto.ReviewRequestDto;
import com.neighborconnect.dto.ReviewResponseDto;
import com.neighborconnect.entity.Review;
import com.neighborconnect.exception.ResourceNotFoundException;
import com.neighborconnect.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {
    @Autowired
    ReviewRepository repository;

    public List<ReviewResponseDto> getAllReviews() {
        List<ReviewResponseDto> dtos =  repository.findAll(Sort.by("rating"))
                .stream()
                .map(this::convertToDto)
                .toList();
        return dtos;
    }

    public ReviewResponseDto getReviewById(Long id) {
        Review entity =  repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Review not found with id " + id));
        return convertToDto(entity);
    }

    public Review addReview(ReviewRequestDto dto) {
        Review entity = convertToEntity(dto);
        return repository.save(entity);
    }

    public ResponseEntity<ReviewResponseDto> updateReview(Long id, ReviewRequestDto dto ) {
        Review existingEntity = repository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Review not found with id " + id));
        Review entity = convertToEntity(dto);
        if (id == existingEntity.getId()) {
            entity.setId(existingEntity.getId());
            repository.save(entity);
            return ResponseEntity.ok(convertToDto(entity));
        }
        return ResponseEntity.badRequest().body(convertToDto(entity));
    }

    // Delete Item (DELETE)
    public void deleteReview(Long id) {
        repository.deleteById(id);
    }

    // Delete All (DELETE)
    public void deleteAll() {
        repository.deleteAll();
    }

    public ReviewResponseDto convertToDto(Review entity) {
        ReviewResponseDto dto = new ReviewResponseDto();

        dto.setId(entity.getId());
        dto.setReviewer(entity.getReviewer());
        dto.setProvider(entity.getProvider());
        dto.setRating(entity.getRating());
        dto.setDescription(entity.getDescription());
        dto.setCreatedAt(entity.getCreatedAt());

        return dto;
    }

    public Review convertToEntity(ReviewRequestDto dto) {
        Review entity = new Review();

        entity.setReviewer(dto.getReviewer());
        entity.setProvider(dto.getProvider());
        entity.setRating(dto.getRating());
        entity.setDescription(dto.getDescription());
        entity.setCreatedAt(dto.getCreatedAt());

        return entity;
    }
}
