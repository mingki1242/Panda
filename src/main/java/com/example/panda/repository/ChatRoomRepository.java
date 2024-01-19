/*
 * title : ChatRoomRepository
 * 설명 : 채팅방 관련 SQL 처리를 위한 클래스
 *       JPA와 ChatRoomEntity를 이용하여 처리
 * 작성자 : 이승현
 * 생성일 : 2023.05.17
 * 업데이트 : -
 */
package com.example.panda.repository;

import com.example.panda.entity.ChatRoomEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ChatRoomRepository extends JpaRepository<ChatRoomEntity, Long> {
    @Modifying
    @Query("UPDATE ChatRoomEntity  e SET e.is_no_read = :isNoRead WHERE e.room_id = :roomId")
    void setNoReadCountByRoomId(@Param("roomId") Long roomId, @Param("isNoRead") Boolean isNoRead);

    @Modifying
    @Query("UPDATE ChatRoomEntity  e SET e.no_read_buyer = :noReadBuyer, e.is_no_read = :isNoRead  WHERE e.room_id = :roomId")
    void setNoReadAndBuyerByRoomId(@Param("roomId") Long roomId, @Param("noReadBuyer") Boolean noReadBuyer, @Param("isNoRead") Boolean isNoRead);

    @Modifying
    @Query("UPDATE ChatRoomEntity  e SET e.evaluate_buyer = :evaluateBuyer WHERE e.room_id = :roomId")
    void setEvaluateBuyerByRoomId(@Param("roomId") Long roomId, @Param("evaluateBuyer") Integer evaluateBuyer);

    @Modifying
    @Query("UPDATE ChatRoomEntity  e SET e.evaluate_seller = :evaluateSeller WHERE e.room_id = :roomId")
    void setEvaluateSellerByRoomId(@Param("roomId") Long roomId, @Param("evaluateSeller") Integer evaluateSeller);

    @Modifying
    @Query("UPDATE ChatRoomEntity e SET e.is_exit_buyer = :isExitBuyer WHERE e.room_id = :roomId")
    void setExitBuyerByRoomId(@Param("roomId") Long roomId, @Param("isExitBuyer") Boolean isExitBuyer);

    @Modifying
    @Query("UPDATE ChatRoomEntity e SET e.is_exit_seller = :isExitSeller WHERE e.room_id = :roomId")
    void setExitSellerByRoomId(@Param("roomId") Long roomId, @Param("isExitSeller") Boolean isExitSeller);

}
