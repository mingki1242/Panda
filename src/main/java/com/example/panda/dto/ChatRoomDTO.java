/*
 * title : ChatRoomDTO
 * 설명 : 채팅방 관련 요청을 위한 DTO.
 * 작성자 : 이승현
 * 생성일 : 2023.05.17
 * 업데이트 : -
 */
package com.example.panda.dto;

import com.example.panda.entity.ChatRoomEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.ZoneId;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatRoomDTO {

    private Long roomId; // 주키
    private UserDTO buyer; // 최초 보낸 사람 (구매자)
    private UserDTO seller;  // 최초 받은 사람 (판매자)
    private String lastContent; // 마지막 메시지의 내용
    private Date lastDate; // 마지막 메시지의 날짜
    private Boolean isNoRead;
    private Boolean noReadBuyer; // buyer가 안읽은건지 (안읽은 사람의 채팅 목록에 표시하기 위함)
    private WritingDTO writing;
    private Integer evaluateBuyer;
    private Integer evaluateSeller;
    private Boolean isExitBuyer;
    private Boolean isExitSeller;

    public static ChatRoomDTO toChatRoomDTO (ChatRoomEntity chatRoomEntity) {
        ChatRoomDTO chatRoomDTO = new ChatRoomDTO();
        chatRoomDTO.setRoomId(chatRoomEntity.getRoom_id());
        chatRoomDTO.setLastContent(chatRoomEntity.getLast_content());
        chatRoomDTO.setEvaluateBuyer(chatRoomEntity.getEvaluate_buyer());
        chatRoomDTO.setEvaluateSeller(chatRoomEntity.getEvaluate_seller());
        chatRoomDTO.setNoReadBuyer(chatRoomEntity.getNo_read_buyer());
        chatRoomDTO.setIsNoRead(chatRoomEntity.getIs_no_read());
        chatRoomDTO.setIsExitBuyer(chatRoomEntity.getIs_exit_buyer());
        chatRoomDTO.setIsExitSeller(chatRoomEntity.getIs_exit_seller());

        if(chatRoomEntity.getLast_date() != null)
            chatRoomDTO.setLastDate(Date.from(chatRoomEntity.getLast_date().atZone(ZoneId.systemDefault()).toInstant()));

        if(chatRoomEntity.getBuyer() != null)
            chatRoomDTO.setBuyer(UserDTO.toUserDTO(chatRoomEntity.getBuyer()));

        if(chatRoomEntity.getSeller() != null)
            chatRoomDTO.setSeller(UserDTO.toUserDTO(chatRoomEntity.getSeller()));

        if(chatRoomEntity.getWriting() != null)
            chatRoomDTO.setWriting(WritingDTO.toWritingDTO(chatRoomEntity.getWriting()));

        return chatRoomDTO;
    }
}
