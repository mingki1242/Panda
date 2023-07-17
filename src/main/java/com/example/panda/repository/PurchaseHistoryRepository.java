package com.example.panda.repository;

import com.example.panda.entity.PurchaseHistoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PurchaseHistoryRepository extends JpaRepository<PurchaseHistoryEntity, Integer> {

}
