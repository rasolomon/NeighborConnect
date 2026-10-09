package com.neighborconnect.dto;


import com.neighborconnect.entity.Service;
import lombok.Data;

import java.util.List;

@Data
public class CategoryRequestDto {
    private String name;
    private String icon;
    private String message;

    private List<ServiceSummaryDto> services;
}
