package com.example.panda.dto;

import com.example.panda.entity.WritingEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WritingDTO {
    private int writing_Id;
    private String writing_name;
    private byte[] writingImg;
    //    private String writingImg;
    private String category;
    private String detail_category;
    private int count;
    private int price;
    private String user_name;
    private int user_point;
    private LocalDate regit_date;
    private UserDTO userDTO;
    private int favorite_count;
    private String content;

//    private byte[] writingImg1;
//    private byte[] writingImg2;
//    private byte[] writingImg3;

    public static WritingDTO toWritingDTO(WritingEntity writingEntity) {
        WritingDTO writingDTO = new WritingDTO();
        writingDTO.setWriting_Id(writingEntity.getWid());
        writingDTO.setWriting_name(writingEntity.getWriting_name());
        if(writingEntity.getWriting_photo()!=null){
            writingDTO.setWritingImg(writingEntity.getWriting_photo());
        }
        writingDTO.setCategory(writingEntity.getCategory());
        writingDTO.setDetail_category(writingEntity.getDetail_category());
        writingDTO.setCount(writingEntity.getCount());
        writingDTO.setPrice(writingEntity.getPrice());
        writingDTO.setRegit_date(writingEntity.getRegit_date());
        writingDTO.setFavorite_count(writingEntity.getFavorite_count());
        writingDTO.setContent(writingEntity.getContent());

        writingDTO.setUserDTO(UserDTO.toUserDTO(writingEntity.getUserEntity()));
        writingDTO.setUser_name(writingDTO.getUserDTO().getNickname());
        writingDTO.setUser_point(writingDTO.getUserDTO().getPoint());


//        if(writingEntity.getWriting_photo1()!=null){
//            writingDTO.setWritingImg1(writingEntity.getWriting_photo1());
//        }
//
//        if(writingEntity.getWriting_photo2()!=null){
//            writingDTO.setWritingImg2(writingEntity.getWriting_photo2());
//        }
//
//        if(writingEntity.getWriting_photo3()!=null){
//            writingDTO.setWritingImg3(writingEntity.getWriting_photo3());
//        }

        return writingDTO;
    }

}