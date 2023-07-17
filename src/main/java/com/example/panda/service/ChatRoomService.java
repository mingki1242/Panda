/*
 * title : ChatRoomService
 * 설명 : 채팅방 관련 처리 작업을 하는 클래스
 * 작성자 : 이승현
 * 생성일 : 2023.05.17
 * 업데이트 : -
 */
package com.example.panda.service;

import com.example.panda.dto.ChatRoomDTO;
import com.example.panda.dto.UserDTO;
import com.example.panda.dto.WritingDTO;
import com.example.panda.entity.ChatRoomEntity;
import com.example.panda.entity.UserEntity;
import com.example.panda.entity.WritingEntity;
import com.example.panda.repository.ChatRoomDSLRepository;
import com.example.panda.repository.ChatRoomRepository;
import com.example.panda.repository.UserRepository;
import com.example.panda.repository.WritingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ChatRoomService {
    private final ChatRoomRepository chatRoomRepository;
    private final ChatRoomDSLRepository chatRoomDSLRepository;
    private final WritingRepository writingRepository;
    private final UserRepository userRepository;

    @Transactional
    public Long save(int wid, String buyer) {
        Optional<WritingEntity> optionalWritingEntity = writingRepository.findById(wid);
        WritingEntity writingEntity = optionalWritingEntity.get();

        UserEntity sellerEntity = writingEntity.getUserEntity();

        if(sellerEntity.getEmail().equals(buyer))
            return null; // 판매자와 구매자가 같은 경우

        Long roomId = chatRoomDSLRepository.findByBuyerEmailAndWid(buyer, wid);
        if(roomId != null) {
            chatRoomRepository.setExitBuyerByRoomId(roomId, false);
            return roomId;
            // 이미 그 게시글에 대한 채팅이 있을 경우
        }

        Optional<UserEntity> optionalBuyerEntity = userRepository.findByEmail(buyer);
        UserEntity buyerEntity = optionalBuyerEntity.get();

        ChatRoomEntity chatRoomEntity
                = new ChatRoomEntity(null, buyerEntity, sellerEntity, " ", null, false, false, writingEntity, 0, 0, false, false);
        return chatRoomRepository.save(chatRoomEntity).getRoom_id();
    }

    @Transactional
    public List<ChatRoomDTO> findByUserEmail(String email) {
        List<ChatRoomEntity> chatRoomEntityList = chatRoomDSLRepository.findByUserEmail(email);
        List<ChatRoomDTO> chatRoomDTOList = new ArrayList<>();

        for(ChatRoomEntity chatRoomEntity : chatRoomEntityList)
            chatRoomDTOList.add(ChatRoomDTO.toChatRoomDTO(chatRoomEntity));

        return chatRoomDTOList;
    }

    @Transactional
    public ChatRoomDTO findById(Long roomId) {
        Optional<ChatRoomEntity> optionalChatRoomEntity = chatRoomRepository.findById(roomId);

        if(optionalChatRoomEntity.isPresent()) {
            ChatRoomEntity chatRoomEntity = optionalChatRoomEntity.get();
          return ChatRoomDTO.toChatRoomDTO(chatRoomEntity);
        } else return null;
    }

    @Transactional
    public void setNoReadCountByRoomId(Long roomId, Boolean isNoRead) {
        chatRoomRepository.setNoReadCountByRoomId(roomId, isNoRead);
    }

    @Transactional
    public void setNoReadAndBuyerByRoomId(Long roomId, Boolean noReadBuyer, Boolean isNoRead) {
        chatRoomRepository.setNoReadAndBuyerByRoomId(roomId, noReadBuyer, isNoRead);
    }

    @Transactional
    public void setEvaluateBuyerByRoomId(Long roomId, Integer evaluateBuyer) {
        chatRoomRepository.setEvaluateBuyerByRoomId(roomId, evaluateBuyer);
    }

    @Transactional
    public void setEvaluateSellerByRoomId(Long roomId, Integer evaluateSeller) {
        chatRoomRepository.setEvaluateSellerByRoomId(roomId, evaluateSeller);
    }

    @Transactional
    public void setExitBuyerByRoomId(Long roomId, Boolean isExitBuyer) {
        chatRoomRepository.setExitBuyerByRoomId(roomId, isExitBuyer);
    }

    @Transactional
    public void setExitSellerByRoomId(Long roomId, Boolean isExitSeller) {
        chatRoomRepository.setExitSellerByRoomId(roomId, isExitSeller);
    }

    @Transactional
    public void deleteByRoomId(Long roomId) {
        chatRoomRepository.deleteById(roomId);
    }

}
