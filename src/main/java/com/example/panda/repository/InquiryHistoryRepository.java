package com.example.panda.repository;

import com.example.panda.entity.InquiryHistoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InquiryHistoryRepository extends JpaRepository<InquiryHistoryEntity, Integer> {
}
