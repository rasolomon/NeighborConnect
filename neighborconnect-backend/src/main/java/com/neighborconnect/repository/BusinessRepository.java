package com.neighborconnect.repository;

import com.neighborconnect.entity.Business;
import com.neighborconnect.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BusinessRepository
        extends JpaRepository<Business, Long> {
}
