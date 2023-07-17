package com.example.panda.repository;

import com.example.panda.entity.InquiryHistoryEntity;
import com.example.panda.entity.PurchaseHistoryEntity;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.example.panda.entity.QInquiryHistoryEntity.inquiryHistoryEntity;

@Repository
@Slf4j
@RequiredArgsConstructor
public class InquiryHistoryDSLRepository {
    private final JPAQueryFactory queryFactory;
    public List<InquiryHistoryEntity> findByEmail(String email){
        return queryFactory
                .selectFrom(inquiryHistoryEntity)
                .where(inquiryHistoryEntity.userEntity.email.eq(email))
                .fetch();
    }
    public void deleteInquiry(String email, int wid){
        queryFactory
                .delete(inquiryHistoryEntity)
                .where(inquiryHistoryEntity.userEntity.email.eq(email).and(inquiryHistoryEntity.writingEntity.wid.eq(wid)))
                .execute();
    }
}

