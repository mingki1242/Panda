package com.example.panda.service;

import com.example.panda.dto.InquiryHistoryDTO;
import com.example.panda.dto.WritingDTO;
import com.example.panda.entity.InquiryHistoryEntity;
import com.example.panda.entity.UserEntity;
import com.example.panda.entity.WritingCompleteEntity;
import com.example.panda.entity.WritingEntity;
import com.example.panda.repository.InquiryHistoryDSLRepository;
import com.example.panda.repository.InquiryHistoryRepository;
import com.example.panda.repository.UserRepository;
import com.example.panda.repository.WritingRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class InquiryHistoryService {
    private final InquiryHistoryDSLRepository inquiryHistoryDSLRepository;
    private final InquiryHistoryRepository inquiryHistoryRepository;
    private final WritingRepository writingRepository;
    private final UserRepository userRepository;
    public List<WritingDTO> findbyEmail(String email){
        List<InquiryHistoryEntity> inquiryHistoryEntities=inquiryHistoryDSLRepository.findByEmail(email);
        List<InquiryHistoryDTO> inquiryHistoryDTOList=new ArrayList<>();
        HashSet<Integer> writingID=new HashSet<>();
        for(InquiryHistoryEntity inquiryHistory:inquiryHistoryEntities){
            inquiryHistoryDTOList.add(InquiryHistoryDTO.toInquiryHistoryDTO(inquiryHistory));
            writingID.add(inquiryHistory.getWritingEntity().getWid());
        }
        List<WritingDTO> list=new ArrayList<>();
        for(int item:writingID){
            Optional<WritingEntity> writingEntity=writingRepository.findById(item);
            list.add(WritingDTO.toWritingDTO(writingEntity.get()));
        }

        return list;
    }
    @Transactional
    public int save(String email, int wid){

        Optional<WritingEntity> optionalWritingEntity=writingRepository.findById(wid);
        Optional<UserEntity> optionalUserEntity=userRepository.findByEmail(email);

        List<InquiryHistoryEntity> inquiryHistoryEntityList=inquiryHistoryDSLRepository.findByEmail(email);
        if(optionalWritingEntity.isPresent() && optionalUserEntity.isPresent()){
            WritingEntity writingEntity = optionalWritingEntity.get();
            UserEntity userEntity = optionalUserEntity.get();
            InquiryHistoryEntity inquiryHistoryEntity=InquiryHistoryEntity.toInquiryHistoryEntity(userEntity,writingEntity);


            for(InquiryHistoryEntity inquiryHistory:inquiryHistoryEntityList) {
                if (inquiryHistory.getUserEntity().getEmail().equals(email) && inquiryHistory.getWritingEntity().getWid() == wid) {
                    inquiryHistoryDSLRepository.deleteInquiry(email,wid);  //조회 날짜 갱신하려고 이전에 검색했던거 삭제하고 밑에서 다시 등록시키기
                    System.out.println("삭제 성공!");
                }
                if(writingEntity.getUserEntity().getEmail().equals(email)) return 2; //자신거를 보면 등록 취소
            }
            System.out.println("저장 성공!");
            inquiryHistoryRepository.save(inquiryHistoryEntity);
            return 3; //정상 등록
        }
        return 4; //존재하지 않는 사용자거나, 존재하지 않는 글을 볼때 비정상 리턴
    }
}
