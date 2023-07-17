package com.example.panda.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "Favorite")
public class FavoriteEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int fid;
    @ManyToOne
    @JoinColumn(name="email")
    private UserEntity userEntity;
    @ManyToOne
    @JoinColumn(name="wid")
    private WritingEntity writingEntity;

}