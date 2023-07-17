// title : UserRepository
// 설명 : 사용자 Repository
//      sql 쿼리 실행을 위한 사용자 repository
//      UserEntity를 이용해 User table에 sql쿼리문 사용.
// 작성자 : 심상혁
// 생성일 : 2023.05.16
// 업데이트 : -
package com.example.panda.repository;

import com.example.panda.entity.UserEntity;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

import java.util.Optional;

import static com.example.panda.entity.QUserEntity.userEntity;

@Repository
@Slf4j
@RequiredArgsConstructor
public class UserRepository{
    private final JPAQueryFactory queryFactory;

    public boolean existsByEmailAndPhoneNumber(String email, String phoneNumber) {
        return queryFactory
                .selectOne()
                .from(userEntity)
                .where(eqEmail(email).or(eqPhoneNumber(phoneNumber)))
                .fetchFirst() != null;
    }

    public Optional<UserEntity> findByEmail(String email) {
        log.info("findByEmail");
        return Optional.ofNullable(queryFactory.selectFrom(userEntity)
                .where(userEntity.email.eq(email))
                .fetchOne());
    }

    private BooleanExpression eqEmail(String email){
        if(!StringUtils.hasText(email))
            return null;
        return userEntity.email.eq(email);
    }
    private BooleanExpression eqPhoneNumber(String phoneNumber){
        if(!StringUtils.hasText(phoneNumber))
            return null;
        return userEntity.phoneNumber.eq(phoneNumber);
    }
}
