package com.neighborconnect.controller;

import com.neighborconnect.dto.OfferRequestDto;
import com.neighborconnect.dto.OfferResponseDto;
import com.neighborconnect.entity.Offer;
import com.neighborconnect.service.OfferService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/offers")

public class OfferController {
    @Autowired
    OfferService service;

    @GetMapping
    public List<OfferResponseDto> getAllOffers() {
        return service.getAllOffers();
    }

    @GetMapping("/{id}")
    public OfferResponseDto getOfferById(@PathVariable Long id) {
        return service.getOfferById(id);
    }

    @PostMapping
    public ResponseEntity<OfferResponseDto> addOffer(@Valid @RequestBody OfferRequestDto offerRequestDto) {
        Offer offer = service.addOffer(offerRequestDto);
        return ResponseEntity.ok(service.convertToDto(offer));
    }

    @PutMapping("/{id}")
    public ResponseEntity<OfferResponseDto> updateOffer(@PathVariable Long id, @Valid @RequestBody OfferRequestDto offerRequestDto ) {
        return  service.updateOffer(id, offerRequestDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteOffer(@PathVariable Long id) {
        service.deleteOffer(id);
        return ResponseEntity.ok("Deleted successfully");
    }

    @DeleteMapping
    public ResponseEntity<String> deleteAll() {
        service.deleteAll();
        return ResponseEntity.ok("Deleted All Offers successfully");
    }

}
