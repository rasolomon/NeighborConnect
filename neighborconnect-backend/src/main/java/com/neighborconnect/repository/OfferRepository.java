package com.neighborconnect.repository;

import com.neighborconnect.entity.Business;
import com.neighborconnect.entity.Offer;
import com.neighborconnect.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OfferRepository
        extends JpaRepository<Offer, Long> {
}
