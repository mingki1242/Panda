package com.example.panda.entity;

import com.example.panda.dto.WritingContentDTO;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "Writing_content")
public class WritingContentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int wcid;
    @Builder.Default
    private int wid;
    @Builder.Default
    private byte[] content_img = null;
    public static WritingContentEntity toWritingContentEntity(WritingContentDTO writingContentDTO)
    {
        WritingContentEntity writingContentEntity = new WritingContentEntity();

        if(writingContentDTO.getContent_img() != null)
        {
            writingContentEntity.setContent_img(writingContentDTO.getContent_img());
        }

        return writingContentEntity;
    }
}

