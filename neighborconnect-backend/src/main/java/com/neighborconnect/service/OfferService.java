package com.neighborconnect.service;

import com.neighborconnect.dto.*;
import com.neighborconnect.dto.OfferResponseDto;
import com.neighborconnect.entity.Business;
import com.neighborconnect.entity.Offer;
import com.neighborconnect.exception.ResourceNotFoundException;
import com.neighborconnect.repository.BusinessRepository;
import com.neighborconnect.repository.OfferRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class OfferService {
    @Autowired
    OfferRepository repository;

    @Autowired
    BusinessRepository businessRepository;

    public List<OfferResponseDto> getAllOffers() {
        List<OfferResponseDto> offerDtos =  repository.findAll(Sort.by("title"))
                .stream()
                .map(this::convertToDto)
                .toList();
        return offerDtos;
    }

    public OfferResponseDto getOfferById(Long id) {
        Offer entity =  repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Offer not found with id " + id));
        return(convertToDto(entity));
    }

    public Offer addOffer(OfferRequestDto dto) {
        Offer entity = convertToEntity(dto);
        return repository.save(entity);
    }

    public ResponseEntity<OfferResponseDto> updateOffer(Long id, OfferRequestDto dto ) {
        Offer existingEntity = repository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Offer not found with id " + id));
        Offer entity = convertToEntity(dto);
        if (id.equals(existingEntity.getId())) {
            entity.setId(existingEntity.getId());
            repository.save(entity);
            return ResponseEntity.ok(convertToDto(entity));
        }
        return ResponseEntity.badRequest().body(convertToDto(entity));
    }

    // Delete Item (DELETE)
    public void deleteOffer( Long id) {
        repository.deleteById(id);
    }

    // Delete All (DELETE)
    public void deleteAll() {
        repository.deleteAll();
    }

    public OfferResponseDto convertToDto(Offer entity) {

        OfferResponseDto dto = new OfferResponseDto();

        dto.setId(entity.getId());
        dto.setTitle(entity.getTitle());
        dto.setPrice(entity.getPrice());
        dto.setOriginalPrice(entity.getOriginalPrice());
        dto.setImageUrl(entity.getImageUrl());
        dto.setExpirationTime(entity.getExpirationTime());
        dto.setPickupWindow(entity.getPickupWindow());
        dto.setLocation(entity.getLocation());
        dto.setInventoryCount(entity.getInventoryCount());
        dto.setActive(entity.getActive());
        dto.setCategory(entity.getCategory());
        BusinessSummaryDto dto2 = new BusinessSummaryDto();
        dto2.setId(entity.getBusiness().getId());
        dto2.setName(entity.getBusiness().getName());
        dto.setBusiness(dto2);
        dto.setCreatedAt(entity.getCreatedAt());
        return dto;
    }

    public Offer convertToEntity(OfferRequestDto dto) {

        Offer entity = new Offer();

        entity.setTitle(dto.getTitle());
        entity.setPrice(dto.getPrice());
        entity.setOriginalPrice(dto.getOriginalPrice());
        entity.setImageUrl(dto.getImageUrl());
        entity.setExpirationTime(dto.getExpirationTime());
        entity.setPickupWindow(dto.getPickupWindow());
        entity.setLocation(dto.getLocation());
        entity.setInventoryCount(dto.getInventoryCount());
        entity.setActive(dto.getActive());
        entity.setCategory(dto.getCategory());
        //TODO Future Improvement:  Preserve original createdAt during updates.

        Business entity2 = businessRepository.findById(dto.getBusinessId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Business not found"));
        entity.setBusiness(entity2);
        return entity;
    }


}
