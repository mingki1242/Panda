/*
 * title : ChatRepository
 * 설명 : 채팅 관련 SQL 처리를 위한 클래스
 *       Mongo와 ChatEntity를 이용하여 처리
 * 작성자 : 이승현
 * 생성일 : 2023.05.17
 * 업데이트 : -
 */
package com.example.panda.repository;

import com.example.panda.entity.ChatEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ChatRepository extends MongoRepository<ChatEntity, String> {

    List<ChatEntity> findByRoomId(@Param("roomId")Long roomId);

}

