package com.example.panda.repository;

import com.example.panda.entity.AuctionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface AuctionRepository extends JpaRepository<AuctionEntity , Integer> {



}
