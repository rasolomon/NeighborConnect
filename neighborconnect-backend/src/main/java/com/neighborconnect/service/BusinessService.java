package com.neighborconnect.service;

import com.neighborconnect.dto.*;
import com.neighborconnect.dto.BusinessResponseDto;
import com.neighborconnect.entity.Business;
import com.neighborconnect.entity.User;
import com.neighborconnect.exception.ResourceNotFoundException;
import com.neighborconnect.repository.BusinessRepository;
import com.neighborconnect.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BusinessService {
    @Autowired
    BusinessRepository repository;

    @Autowired
    UserRepository userRepository;

    public List<BusinessResponseDto> getAllBusinesses() {
        List<BusinessResponseDto> businessDtos =  repository.findAll(Sort.by("name"))
                .stream()
                .map(this::convertToDto)
                .toList();
        return businessDtos;
    }

    public BusinessResponseDto getBusinessById(Long id) {
        Business entity =  repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Business not found with id " + id));
        return(convertToDto(entity));
    }

    public Business addBusiness(BusinessRequestDto dto) {
        Business entity = convertToEntity(dto);
        return repository.save(entity);
    }

    public ResponseEntity<BusinessResponseDto> updateBusiness(Long id, BusinessRequestDto dto ) {
        Business existingEntity = repository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Business not found with id " + id));
        Business entity = convertToEntity(dto);
        if (id.equals(existingEntity.getId())) {
            entity.setId(existingEntity.getId());
            repository.save(entity);
            return ResponseEntity.ok(convertToDto(entity));
        }
        return ResponseEntity.badRequest().body(convertToDto(entity));
    }

    // Delete Item (DELETE)
    public void deleteBusiness( Long id) {
        repository.deleteById(id);
    }

    // Delete All (DELETE)
    public void deleteAll() {
        repository.deleteAll();
    }

    public BusinessResponseDto convertToDto(Business entity) {

        BusinessResponseDto dto = new BusinessResponseDto();

        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setAddress(entity.getAddress());
        dto.setCity(entity.getCity());
        dto.setState(entity.getState());
        dto.setZipCode(entity.getZipCode());
        dto.setPhone(entity.getPhone());
        dto.setEmail(entity.getEmail());
        dto.setDescription(entity.getDescription());
        dto.setLogo(entity.getLogo());
        UserSummaryDto dto2 = new UserSummaryDto();
        dto2.setId(entity.getOwner().getId());
        dto2.setName(entity.getOwner().getName());
        dto.setOwner(dto2);
        return dto;
    }

    public Business convertToEntity(BusinessRequestDto dto) {

        Business entity = new Business();

        entity.setName(dto.getName());
        entity.setAddress(dto.getAddress());
        entity.setCity(dto.getCity());
        entity.setState(dto.getState());
        entity.setZipCode(dto.getZipCode());
        entity.setPhone(dto.getPhone());
        entity.setEmail(dto.getEmail());
        entity.setDescription(dto.getDescription());
        entity.setLogo(dto.getLogo());

        User entity2 = userRepository.findById(dto.getOwnerId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found with id " + dto.getOwnerId()));
        entity.setOwner(entity2);
        return entity;
    }


}
