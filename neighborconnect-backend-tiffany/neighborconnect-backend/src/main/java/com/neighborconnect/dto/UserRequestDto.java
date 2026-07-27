package com.neighborconnect.dto;

import com.neighborconnect.entity.Service;
import com.neighborconnect.entity.UserType;
import lombok.Data;

import java.util.List;

@Data
public class UserRequestDto {
    private String name;
    private String address;
    private String city;
    private String state;
    private Integer zipCode;
    private String phone;
    private String email;
    private String description;
    private UserType userType;
    private List<ServiceSummaryDto> services;
}