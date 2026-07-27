package com.neighborconnect.service;

import com.neighborconnect.dto.ServiceSummaryDto;
import com.neighborconnect.dto.UserRequestDto;
import com.neighborconnect.dto.UserResponseDto;
import com.neighborconnect.entity.User;
import com.neighborconnect.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
    @Autowired
    UserRepository repository;

    public List<UserResponseDto> getAllUsers() {
        List<UserResponseDto> userDtos =  repository.findAll(Sort.by("name"))
                .stream()
                .map(this::convertToDto)
                .toList();
        return userDtos;
    }

    public UserResponseDto getUserById(Long id) {
        User entity =  repository.findById(id)
                .orElseThrow(() ->
                        new EntityNotFoundException("User not found with id " + id));
        return(convertToDto(entity));
    }

    public User addUser(UserRequestDto dto) {
        User entity = convertToEntity(dto);
        return repository.save(entity);
    }

    public ResponseEntity<UserResponseDto> updateUser(Long id, UserRequestDto dto ) {
        User existingEntity = repository.findById(id).orElseThrow(() ->
                new EntityNotFoundException("User not found with id " + id));
        User entity = convertToEntity(dto);
        if (id == existingEntity.getId()) {
            entity.setId(existingEntity.getId());
            repository.save(entity);
            return ResponseEntity.ok(convertToDto(entity));
        }
        return ResponseEntity.badRequest().body(convertToDto(entity));
    }

    // Delete Item (DELETE)
    public void deleteUser( Long id) {
        repository.deleteById(id);
    }

    // Delete All (DELETE)
    public void deleteAll() {
        repository.deleteAll();
    }

    public UserResponseDto convertToDto(User entity) {
//
        UserResponseDto dto = new UserResponseDto();

        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setAddress(entity.getAddress());
        dto.setCity(entity.getCity());
        dto.setState(entity.getState());
        dto.setZipCode(entity.getZipCode());
        dto.setPhone(entity.getPhone());
        dto.setEmail(entity.getEmail());
        dto.setDescription(entity.getDescription());
        dto.setUserType(entity.getUserType());

        if (entity.getServices() != null ) {
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

    public User convertToEntity(UserRequestDto dto) {

        User entity = new User();

        entity.setName(dto.getName());
        entity.setAddress(dto.getAddress());
        entity.setCity(dto.getCity());
        entity.setState(dto.getState());
        entity.setZipCode(dto.getZipCode());
        entity.setPhone(dto.getPhone());
        entity.setEmail(dto.getEmail());
        entity.setDescription(dto.getDescription());
        entity.setUserType(dto.getUserType());
        if (dto.getServices() != null) {
            List<com.neighborconnect.entity.Service> entities =
                    dto.getServices()
                            .stream()
                            .map(dto2 -> {
                                com.neighborconnect.entity.Service entity2 = new com.neighborconnect.entity.Service();
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
