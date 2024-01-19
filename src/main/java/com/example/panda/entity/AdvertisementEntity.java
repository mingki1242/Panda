package com.example.panda.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "Advertisement")
public class AdvertisementEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int aid;

    @Column
    private LocalDateTime ad_regitDate;
    @Column
    private int ad_price;

    @OneToOne
    @JoinColumn(name="wid")   //unique 해야함
    private WritingEntity writingEntity;
}
