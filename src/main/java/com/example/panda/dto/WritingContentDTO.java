package com.example.panda.dto;


import com.example.panda.entity.WritingContentEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WritingContentDTO {
    private int wcid;
    private int wid;
    private byte[] content_img;

    public static WritingContentDTO toWritingContentDTO(WritingContentEntity writingContentEntity)
    {
        WritingContentDTO writingContentDTO = new WritingContentDTO();

        writingContentDTO.setWid(writingContentEntity.getWid());
        if(writingContentEntity.getContent_img() != null)
        {
            writingContentDTO.setContent_img((writingContentEntity.getContent_img()));
        }

        return writingContentDTO;
    }
}
