package com.example.panda.repository;

import com.example.panda.entity.FavoriteEntity;
import com.querydsl.jpa.impl.JPADeleteClause;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.util.List;
import static com.example.panda.entity.QFavoriteEntity.favoriteEntity;

@Repository
@Slf4j
@RequiredArgsConstructor
public class FavoriteDSLRepository {
    private final JPAQueryFactory queryFactory;
    public List<FavoriteEntity> findByEmail(String email){
        return queryFactory
                .selectFrom(favoriteEntity)
                .where(favoriteEntity.userEntity.email.eq(email))
                .fetch();
    }
    public List<FavoriteEntity> findByWid(int wid){
        return queryFactory
                .selectFrom(favoriteEntity)
                .where(favoriteEntity.writingEntity.wid.eq(wid))
                .fetch();
    }

    public void deleteFavorite(String email,int wid){
        queryFactory
                .delete(favoriteEntity)
                .where(favoriteEntity.userEntity.email.eq(email).and(favoriteEntity.writingEntity.wid.eq(wid)))
                .execute();
    }
}
