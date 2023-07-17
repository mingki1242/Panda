package com.example.panda.dto;

import com.example.panda.entity.InquiryHistoryEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.ZoneId;
import java.util.Date;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class InquiryHistoryDTO {
    private int iid;
    private UserDTO userDTO;
    private WritingDTO writingDTO;
    private Date inquiry_date;
    public static InquiryHistoryDTO toInquiryHistoryDTO(InquiryHistoryEntity inquiryHistoryEntity){
        InquiryHistoryDTO inquiryHistoryDTO=new InquiryHistoryDTO();
        inquiryHistoryDTO.setIid(inquiryHistoryEntity.getIid());
        inquiryHistoryDTO.setUserDTO(UserDTO.toUserDTO(inquiryHistoryEntity.getUserEntity()));
        inquiryHistoryDTO.setWritingDTO(WritingDTO.toWritingDTO(inquiryHistoryEntity.getWritingEntity()));
        Date date = Date.from(inquiryHistoryEntity.getInquiry_date().atZone(ZoneId.systemDefault()).toInstant());

        inquiryHistoryDTO.setInquiry_date(date); //localDateTime -> Date 형식으로 바꿔서 보냄
        return inquiryHistoryDTO;
    }
}
