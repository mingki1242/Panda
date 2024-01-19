package com.example.panda.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "Inquiry_history")
public class InquiryHistoryEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int iid;

    @ManyToOne
    @JoinColumn(name="email")
    private UserEntity userEntity;  //사용자
    @ManyToOne
    @JoinColumn(name="wid")
    private WritingEntity writingEntity;
    @Column
    private LocalDateTime inquiry_date;

    public static InquiryHistoryEntity toInquiryHistoryEntity(UserEntity userEntity, WritingEntity writingEntity){
        InquiryHistoryEntity inquiryHistoryEntity=new InquiryHistoryEntity();
        inquiryHistoryEntity.setInquiry_date(LocalDateTime.now());
        if(userEntity != null)
            inquiryHistoryEntity.setUserEntity(userEntity);
        if(writingEntity != null)
            inquiryHistoryEntity.setWritingEntity(writingEntity);

        return inquiryHistoryEntity;
    }
}
