package com.neighborconnect.dto;

import lombok.Data;


@Data
public class BusinessResponseDto {
    private Long id;
    private String name;
    private String address;
    private String city;
    private String state;
    private Integer zipCode;
    private String phone;
    private String email;
    private String website;
    private String description;
    private String logo;
    private UserSummaryDto owner;
    private CategorySummaryDto category;
}
