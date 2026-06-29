package com.neighborconnect.dto;


import com.neighborconnect.entity.Service;
import lombok.Data;

import java.util.List;

@Data
public class CategoryResponseDto {
    private Long id;
    private String name;
    private List<ServiceSummaryDto> services;
}
