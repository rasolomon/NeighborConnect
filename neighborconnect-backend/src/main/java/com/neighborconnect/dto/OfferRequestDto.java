package com.neighborconnect.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class OfferRequestDto {
    @NotBlank(message = "Offer title is required")
    @Size(max = 150, message = "Offer title cannot exceed 150 characters")
    private String title;
    private BigDecimal price;
    private BigDecimal originalPrice;
    private String imageUrl;
    private LocalDateTime expirationTime;
    private String pickupWindow;
    private Long businessId;
    private String location;
    private Integer inventoryCount;
    private Boolean active;

    // TODO:  In the future, we may want to make this into a Category object but keep it String for V1
    private String category;
}
