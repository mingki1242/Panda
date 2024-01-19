package com.example.panda.dto;

import com.example.panda.entity.FavoriteEntity;
import com.example.panda.entity.WritingEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FavoriteDTO {
    private String user_id;
    private int writing_id;
    private int price;
    private String writing_name;
    private LocalDate regit_date;
    private UserDTO userDTO;
    private WritingDTO writingDTO;

    public static FavoriteDTO toFavoriteDTO(FavoriteEntity favoriteEntity) {
        FavoriteDTO favoriteDTO = new FavoriteDTO();
        favoriteDTO.setUser_id(favoriteEntity.getUserEntity().getEmail());
        favoriteDTO.setWriting_id(favoriteEntity.getWritingEntity().getWid());
        favoriteDTO.setPrice(favoriteEntity.getWritingEntity().getPrice());
        favoriteDTO.setWriting_name(favoriteEntity.getWritingEntity().getWriting_name());
        favoriteDTO.setRegit_date(favoriteEntity.getWritingEntity().getRegit_date());

        if(favoriteEntity.getUserEntity()!=null) favoriteDTO.setUserDTO(UserDTO.toUserDTO(favoriteEntity.getUserEntity()));
        if(favoriteEntity.getWritingEntity()!=null) {
            favoriteDTO.setWritingDTO(WritingDTO.toWritingDTO(favoriteEntity.getWritingEntity()));
            //userDTO, writingDTO 값 넣어주기
        }


        return favoriteDTO;
    }
}
