package com.example.panda.repository;

import com.example.panda.entity.PurchaseHistoryEntity;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;
import static com.example.panda.entity.QPurchaseHistoryEntity.purchaseHistoryEntity;

import java.util.List;

@Repository
@Slf4j
@RequiredArgsConstructor
public class PurchaseHistoryDSLRepository {
    private final JPAQueryFactory queryFactory;
    public List<PurchaseHistoryEntity> findByEmail(String email){
        return queryFactory
                .selectFrom(purchaseHistoryEntity)
                .where(purchaseHistoryEntity.userEntity.email.eq(email))
                .fetch();
    }
}
