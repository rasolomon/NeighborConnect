package com.neighborconnect.service;

import com.neighborconnect.dto.ServiceRequestDto;
import com.neighborconnect.dto.ServiceResponseDto;
import com.neighborconnect.entity.Service;
import com.neighborconnect.exception.ResourceNotFoundException;
import com.neighborconnect.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@org.springframework.stereotype.Service
public class ServiceService {
    @Autowired
    ServiceRepository repository;

    public List<ServiceResponseDto> getAllServices() {
        List<ServiceResponseDto> dtos =  repository.findAll(Sort.by("name"))
                .stream()
                .map(this::convertToDto)
                .toList();
        return dtos;        }

    public ServiceResponseDto getServiceById(Long id) {
        Service entity =  repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Service not found with id " + id));
        return(convertToDto(entity));
    }

    public Service addService(ServiceRequestDto dto) {
        Service entity = convertToEntity(dto);
        return repository.save(entity);
    }

    public ResponseEntity<ServiceResponseDto> updateService(Long id, ServiceRequestDto dto ) {
        Service existingEntity = repository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Service not found with id " + id));
        Service entity = convertToEntity(dto);
        if (id == existingEntity.getId()) {
            entity.setId(existingEntity.getId());
            repository.save(entity);
            return ResponseEntity.ok(convertToDto(entity));
        }
        return ResponseEntity.badRequest().body(convertToDto(entity));
    }

    // Delete Item (DELETE)
    public void deleteService(Long id) {
        repository.deleteById(id);
    }

    // Delete All (DELETE)
    public void deleteAll() {
        repository.deleteAll();
    }

    public ServiceResponseDto convertToDto(Service entity) {
        ServiceResponseDto dto = new ServiceResponseDto();

        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setCategory(entity.getCategory());

        return dto;
    }

    public Service convertToEntity(ServiceRequestDto dto) {
        Service entity = new Service();

        entity.setName(dto.getName());
        entity.setCategory(dto.getCategory());

        return entity;
    }
}
