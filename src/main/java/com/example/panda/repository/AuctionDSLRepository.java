package com.example.panda.repository;

import com.example.panda.entity.AuctionEntity;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

import java.util.Optional;

import static com.example.panda.entity.QAuctionEntity.auctionEntity;
import static com.example.panda.entity.QFavoriteEntity.favoriteEntity;

@Repository
@Slf4j
@RequiredArgsConstructor
public class AuctionDSLRepository {
    private final JPAQueryFactory queryFactory;

    public Optional<AuctionEntity> existsByWid(int wid) {
        return Optional.ofNullable(queryFactory
                .selectFrom(auctionEntity)
                .where(eqWid(wid))
                .fetchFirst());
    }
    private BooleanExpression eqWid(int wid){
        return auctionEntity.wid.eq(wid);
    }
}
