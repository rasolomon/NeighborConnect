package com.neighborconnect.dto;

import com.neighborconnect.entity.Business;
import com.neighborconnect.entity.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.List;

@Data
public class UserRequestDto {
    @NotBlank(message = "Name is required")
    @Size(max = 100, message = "Name cannot exceed 100 characters")
    private String name;
    private String address;
    private String city;
    private String state;
    private Integer zipCode;
    private String phone;

    @NotBlank(message = "Email is required")
    @Email(message = "Please enter a valid email address")
    private String email;
    private String description;
    private Role role;
    private List<BusinessSummaryDto> businesses;
}