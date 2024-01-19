package com.example.panda.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "Writing_complete")
public class WritingCompleteEntity {
    @Id // pk
    private int wid;
    @Column(length = 64)
    private String writing_name;
    @Column(length = 32)
    private String category;
    @Column(length = 32)
    private String detail_category;
    @Column
    private int price;
    @ManyToOne
    @JoinColumn(name="email")
    private UserEntity userEntity; // 글 작성자
    @Lob
//    private String writing_photo;
    private byte[] writing_photo;

    public static WritingCompleteEntity writingToComplete (WritingEntity writingEntity) {
        WritingCompleteEntity writingCompleteEntity = new WritingCompleteEntity();

        writingCompleteEntity.setWriting_name(writingEntity.getWriting_name());
        writingCompleteEntity.setWid(writingEntity.getWid());
        writingCompleteEntity.setCategory(writingEntity.getCategory());
        writingCompleteEntity.setDetail_category(writingEntity.getDetail_category());
        writingCompleteEntity.setPrice(writingEntity.getPrice());
        if(writingEntity.getWriting_photo()!=null){
            writingCompleteEntity.setWriting_photo(writingEntity.getWriting_photo());
        }
        if(writingEntity.getUserEntity() != null)
            writingCompleteEntity.setUserEntity(writingEntity.getUserEntity());
        if(writingEntity.getWriting_photo() != null)
            writingCompleteEntity.setWriting_photo(writingEntity.getWriting_photo());

        return writingCompleteEntity;
    }

}