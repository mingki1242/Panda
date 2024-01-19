package com.example.panda.entity;

import com.example.panda.repository.PurchaseHistoryRepository;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "Purchase_history")
public class PurchaseHistoryEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int pid;
    @ManyToOne
    @JoinColumn(name="email")
    private UserEntity userEntity;  //구매자
    @ManyToOne
    @JoinColumn(name="wid")
    private WritingCompleteEntity writingCompleteEntity;

    @Column
    private LocalDateTime purchase_date;

    public static PurchaseHistoryEntity toPurchaseHistoryEntity(UserEntity userEntity, WritingCompleteEntity writingCompleteEntity) {
        PurchaseHistoryEntity purchaseHistoryEntity = new PurchaseHistoryEntity();

        purchaseHistoryEntity.setPurchase_date(LocalDateTime.now());

        if(userEntity != null)
            purchaseHistoryEntity.setUserEntity(userEntity);
        if(writingCompleteEntity != null)
            purchaseHistoryEntity.setWritingCompleteEntity(writingCompleteEntity);

        return purchaseHistoryEntity;
    }
}
