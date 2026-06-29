package com.neighborconnect.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class OfferResponseDto {
    private Long id;
    private String title;
    private BigDecimal price;
    private BigDecimal originalPrice;
    private String imageUrl;
    private LocalDateTime expirationTime;
    private String pickupWindow;
    private BusinessSummaryDto business;
    private String location;
    private Integer inventoryCount;
    private Boolean active;
    private LocalDateTime createdAt;

    // TODO:  In the future, we may want to make this into a Category object but keep it String for V1
    private String category;
}
