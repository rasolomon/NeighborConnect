package com.neighborconnect.dto;

import com.neighborconnect.entity.User;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ReviewRequestDto {
    private User reviewer;
    private User provider;
    private Integer rating;
    private String description;
    private LocalDateTime createdAt;
}
