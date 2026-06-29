package com.neighborconnect.dto;


import com.neighborconnect.entity.Category;
import lombok.Data;


@Data
public class ServiceResponseDto {
    private Long id;
    private String name;
    private Category category;
}
