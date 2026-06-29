package com.neighborconnect.dto;

import com.neighborconnect.entity.Business;
import com.neighborconnect.entity.Role;
import lombok.Data;

import java.util.List;

@Data
public class UserResponseDto {
    private Long id;
    private String name;
    private String address;
    private String city;
    private String state;
    private Integer zipCode;
    private String phone;
    private String email;
    private String description;
    private Role role;
    private List<BusinessSummaryDto> businesses;
}