package com.example.panda.dto;

import com.example.panda.entity.WritingCompleteEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class WritingCompleteDTO {
    private int wid;
    private String writing_name;
    private String category;
    private String detail_category;
    private UserDTO userDTO;  //글 작성자
    private byte[] writing_photo;
    private int price;

    public static WritingCompleteDTO toWritingComplete(WritingCompleteEntity writingCompleteEntity){
        WritingCompleteDTO writingCompleteDTO=new WritingCompleteDTO();
        writingCompleteDTO.setWid(writingCompleteEntity.getWid());
        writingCompleteDTO.setWriting_name(writingCompleteEntity.getWriting_name());
        writingCompleteDTO.setCategory(writingCompleteEntity.getCategory());
        writingCompleteDTO.setDetail_category(writingCompleteEntity.getDetail_category());
        writingCompleteDTO.setUserDTO(UserDTO.toUserDTO(writingCompleteEntity.getUserEntity()));
        if(writingCompleteEntity.getWriting_photo()!=null){
            writingCompleteDTO.setWriting_photo(writingCompleteEntity.getWriting_photo());
        }
        writingCompleteDTO.setPrice(writingCompleteEntity.getPrice());

        return writingCompleteDTO;
    }
}