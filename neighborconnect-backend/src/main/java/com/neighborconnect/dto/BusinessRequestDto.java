package com.neighborconnect.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.List;


@Data
public class BusinessRequestDto {
    @NotBlank(message = "Business name is required")
    @Size(max = 100, message = "Business name cannot exceed 100 characters")
    private String name;
    private String address;
    private String city;
    private String state;
    private Integer zipCode;
    private String phone;

    @NotBlank(message = "Business email is required")
    @Email(message = "Please enter a valid email address")
    private String email;
    private String description;
    private String logo;
    private Long ownerId;
}
