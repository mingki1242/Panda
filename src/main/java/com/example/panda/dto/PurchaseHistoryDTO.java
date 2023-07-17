package com.example.panda.dto;

import com.example.panda.entity.PurchaseHistoryEntity;
import com.example.panda.entity.WritingCompleteEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PurchaseHistoryDTO {
    private int pid;
    private UserDTO userDTO;  //구매자
    private WritingCompleteDTO writingCompleteDTO;
    private Date purchase_date;
    public static PurchaseHistoryDTO toPurchaseHistoryDTO(PurchaseHistoryEntity purchaseHistoryEntity){
        PurchaseHistoryDTO purchaseHistoryDTO=new PurchaseHistoryDTO();
        purchaseHistoryDTO.setPid(purchaseHistoryDTO.getPid());
        purchaseHistoryDTO.setUserDTO(UserDTO.toUserDTO(purchaseHistoryEntity.getUserEntity()));
        purchaseHistoryDTO.setWritingCompleteDTO(WritingCompleteDTO.toWritingComplete(purchaseHistoryEntity.getWritingCompleteEntity()));
        Date date = Date.from(purchaseHistoryEntity.getPurchase_date().atZone(ZoneId.systemDefault()).toInstant());

        purchaseHistoryDTO.setPurchase_date(date); //localDateTime -> Date 형식으로 바꿔서 보냄

        return purchaseHistoryDTO;
    }
}
