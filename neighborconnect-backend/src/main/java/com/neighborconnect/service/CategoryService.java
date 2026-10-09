package com.neighborconnect.service;

import com.neighborconnect.dto.CategoryRequestDto;
import com.neighborconnect.dto.CategoryResponseDto;
import com.neighborconnect.dto.ServiceSummaryDto;
import com.neighborconnect.entity.Category;
import com.neighborconnect.entity.Service;
import com.neighborconnect.exception.ResourceNotFoundException;
import com.neighborconnect.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

@org.springframework.stereotype.Service
public class CategoryService {
    @Autowired
    CategoryRepository repository;

    public List<CategoryResponseDto> getAllCategories() {
        List<CategoryResponseDto> categoryResponseDtos =  repository.findAll(Sort.by("name"))
                .stream()
                .map(this::convertToDto)
                .toList();
        return categoryResponseDtos;
    }

    public CategoryResponseDto getCategoryById(Long id) {
        Category entity =  repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Category not found with id " + id));
        return(convertToDto(entity));
    }

    public Category addCategory(CategoryRequestDto dto) {
        Category entity = convertToEntity(dto);
        return repository.save(entity);
    }

    public ResponseEntity<CategoryResponseDto> updateCategory(Long id, CategoryRequestDto dto ) {
        Category existingEntity = repository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Category not found with id " + id));
        Category entity = convertToEntity(dto);
        if (id == existingEntity.getId()) {
            entity.setId(existingEntity.getId());
            repository.save(entity);
            return ResponseEntity.ok(convertToDto(entity));
        }
        return ResponseEntity.badRequest().body(convertToDto(entity));
    }

    // Delete Item (DELETE)
    public void deleteCategory(Long id) {
        repository.deleteById(id);
    }

    // Delete All (DELETE)
    public void deleteAll() {
        repository.deleteAll();
    }

    public CategoryResponseDto convertToDto(Category entity) {
        CategoryResponseDto dto = new CategoryResponseDto();

        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setIcon(entity.getIcon());
        dto.setMessage(entity.getMessage());

        if (entity.getServices() != null) {
            List<ServiceSummaryDto> dtos =
                    entity.getServices()
                            .stream()
                            .map(entity2 -> {
                                ServiceSummaryDto dto2 = new ServiceSummaryDto();
                                dto2.setId(entity2.getId());
                                dto2.setName(entity2.getName());
                                return dto2;
                            })
                            .toList();

            dto.setServices(dtos);
        } else {
            dto.setServices(new ArrayList<>());
        }
        return dto;
    }

    public Category convertToEntity(CategoryRequestDto dto) {
        Category entity = new Category();

        entity.setName(dto.getName());
        entity.setIcon(dto.getIcon());
        entity.setMessage((dto.getMessage()));
        if (dto.getServices() != null) {
            List<Service> entities =
                    dto.getServices()
                            .stream()
                            .map(dto2 -> {
                                Service entity2 = new Service();
                                entity2.setId(dto2.getId());
                                entity2.setName(dto2.getName());
                                return entity2;
                            })
                            .toList();

            entity.setServices(entities);
        } else {
            entity.setServices(new ArrayList<>());
        }

        return entity;
    }
}
