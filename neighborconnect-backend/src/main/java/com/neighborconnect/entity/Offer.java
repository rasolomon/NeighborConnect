package com.neighborconnect.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Offer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private BigDecimal price;
    private BigDecimal originalPrice;
    private String imageUrl;
    private LocalDateTime expirationTime;
    private String pickupWindow;

    @ManyToOne
    private Business business;
    private String location;
    private Integer inventoryCount;
    private Boolean active = true;

    @CreationTimestamp
    private LocalDateTime createdAt;

    // TODO:  In the future, we may want to make this into a Category object but keep it String for V1
    private String category;
}
