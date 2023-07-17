/*
 * title : ChatRepositoryCustomImpl
 * 설명 : MongoDB에서 Aggreegation 기능을 사용하여
 *       좀 더 다양한 기능을 사용하기 위하여 제작한 클래스.
 * 작성자 : 이승현
 * 생성일 : 2023.05.21
 * 업데이트 : -
 */
package com.example.panda.repository;

import com.example.panda.entity.ChatEntity;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.aggregation.MatchOperation;
import org.springframework.data.mongodb.core.aggregation.SortOperation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

import static org.springframework.data.mongodb.core.aggregation.Aggregation.*;

@Repository
public class ChatRepositoryCustomImpl {

    private final MongoOperations mongoOperations;

    public ChatRepositoryCustomImpl(MongoOperations mongoOperations) {
        this.mongoOperations = mongoOperations;
    }

    public List<ChatEntity> findTopNByRoomIdOrderByTimestampDesc(Long roomId, int count) {
        MatchOperation matchOperation = match(Criteria.where("roomId").is(roomId));
        SortOperation sortOperation = sort(Sort.Direction.DESC, "chatDate");
        Aggregation aggregation = newAggregation(matchOperation, sortOperation, limit(count));

        AggregationResults<ChatEntity> results = mongoOperations.aggregate(aggregation, "Chat", ChatEntity.class);

        return results.getMappedResults();
    }

    public void deleteByRoomId(Long roomId) {
        Query query = new Query(Criteria.where("roomId").is(roomId));
        mongoOperations.remove(query, ChatEntity.class);
    }
}