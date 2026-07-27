package com.neighborconnect.dto;


import com.neighborconnect.entity.Category;
import lombok.Data;


@Data
public class ServiceRequestDto {
    private String name;
    private Category category;
}
