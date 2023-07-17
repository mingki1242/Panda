package com.example.panda.entity;

import com.example.panda.dto.WritingDTO;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Entity
@Getter
@Setter
@Table(name = "Writing")
public class WritingEntity {
    @Id // pk
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int wid;
    @Column(length = 64)
    private String writing_name;
    @Lob
//    private String writing_photo;
    @Builder.Default
    private byte[] writing_photo=null;
    @Column(length = 32)
    private String category;
    @Column(length = 32)
    private String detail_category;
    @Column
    private int count;
    @Column
    private int price;
    @Column
    private LocalDate regit_date;

    @ManyToOne
    @JoinColumn(name="email")
    private UserEntity userEntity;
    @Column
    private int favorite_count;
    @Column(length = 1024)
    private String content;

//    @Builder.Default
//    private byte[] writing_photo1=null;
//    @Builder.Default
//    private byte[] writing_photo2=null;
//    @Builder.Default
//    private byte[] writing_photo3=null;


    public String getRegit_dateFormatted() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        return regit_date.format(formatter);
    }
    public static WritingEntity toWritingEntity(WritingDTO writingDTO){  //글 저장용
        WritingEntity writingEntity=new WritingEntity();

        writingEntity.setWriting_name(writingDTO.getWriting_name());
        if(writingDTO.getWritingImg()!=null) {
            writingEntity.setWriting_photo(writingDTO.getWritingImg());
        }
        writingEntity.setContent(writingDTO.getContent());
        writingEntity.setCategory(writingDTO.getCategory());
        writingEntity.setDetail_category(writingDTO.getDetail_category());
        writingEntity.setCount(writingDTO.getCount());
        writingEntity.setPrice(writingDTO.getPrice());


        writingEntity.setRegit_date(LocalDate.now());

        writingEntity.setFavorite_count(0);

//        if(writingDTO.getWritingImg1()!=null) {
//            writingEntity.setWriting_photo1(writingDTO.getWritingImg1());
//        }
//
//        if(writingDTO.getWritingImg2()!=null) {
//            writingEntity.setWriting_photo2(writingDTO.getWritingImg2());
//        }
//
//        if(writingDTO.getWritingImg3()!=null) {
//            writingEntity.setWriting_photo3(writingDTO.getWritingImg3());
//        }

        return writingEntity;
    }
}