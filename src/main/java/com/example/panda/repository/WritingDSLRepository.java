package com.example.panda.repository;

import com.example.panda.dto.WritingResponseDTO;
import com.example.panda.entity.AuctionEntity;
import com.example.panda.entity.WritingEntity;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import static com.example.panda.entity.QAuctionEntity.auctionEntity;
import static com.example.panda.entity.QWritingEntity.writingEntity;

import java.time.LocalDateTime;
import java.util.List;

@Repository
@Slf4j
@RequiredArgsConstructor
public class WritingDSLRepository {
    private final JPAQueryFactory queryFactory;
    public List<WritingEntity> findSearch(String word){
        return queryFactory
                .selectFrom(writingEntity)
                .where(writingEntity.writing_name.like(word)
                        .or(writingEntity.category.like(word))
                        .or(writingEntity.detail_category.like(word)))
                .fetch();
    }
    public List<WritingEntity> findByIdList(List<Integer> widList){
        return queryFactory
                .selectFrom(writingEntity)
                .where(writingEntity.wid.in(widList))
                .fetch();
    }
    public List<WritingEntity> findPopularWriting(){
        return queryFactory
                .selectFrom(writingEntity)
                .orderBy(writingEntity.favorite_count.desc())
                .limit(10)
                .fetch();
    }

    public List<WritingEntity> findCheapWriting() {
        return queryFactory
                .selectFrom(writingEntity)
                .orderBy(writingEntity.price.asc())
                .limit(10)
                .fetch();
    }

    public List<WritingEntity> findExpensiveWriting() {
        return queryFactory
                .selectFrom(writingEntity)
                .orderBy(writingEntity.price.desc())
                .limit(10)
                .fetch();
    }


    public List<WritingEntity> findByUserEmail(String userEmail) {
        return queryFactory
                .selectFrom(writingEntity)
                .where(writingEntity.userEntity.email.eq(userEmail))
                .fetch();
    }

    public List<AuctionEntity> deleteByAuction_dateBefore(LocalDateTime currentDateTime){

        List<AuctionEntity> auctionEntityList = queryFactory
                .selectFrom(auctionEntity)
                .where(auctionEntity.auction_date.before(currentDateTime))
                .fetch();

        queryFactory
                .delete(auctionEntity)
                .where(auctionEntity.auction_date.before(currentDateTime))
                .execute();

        return auctionEntityList;
    }
}
