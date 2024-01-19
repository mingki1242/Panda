package com.example.panda.entity;

import com.example.panda.dto.AuctionDTO;
import com.example.panda.dto.WritingDTO;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Builder
@Table(name = "Auction")
public class AuctionEntity {
    @Id
    private int wid;
    @Column
    private LocalDateTime auction_date;
    @Column
    private int highest_value;
    @Column
    private int buy_now;
    @ManyToOne
    @JoinColumn(name = "email")
    private UserEntity userEntity;
    @Column
    private int lowest_value;


    public static AuctionEntity toAuctionEntity(AuctionDTO auctionDTO,int auction_date){
        AuctionEntity auctionEntity=new AuctionEntity();

        auctionEntity.setWid(auctionDTO.getWid());
        auctionEntity.setAuction_date(LocalDateTime.now().plusDays(auction_date).withHour(23).withMinute(59).withSecond(59));  //현재일로부터 임의로 정한 일뒤에 마감
        auctionEntity.setBuy_now(auctionDTO.getBuy_now());
        auctionEntity.setHighest_value(auctionDTO.getHighest_value());
        auctionEntity.setLowest_value(auctionDTO.getLowest_value());

        return auctionEntity;
    }
    @Builder
    public AuctionEntity(int wid, LocalDateTime auction_date, int highest_value, int buy_now, UserEntity userEntity, int lowest_value){
        this.wid = wid;
        this.auction_date = auction_date;
        this.highest_value = highest_value;
        this.buy_now = buy_now;
        this.userEntity = userEntity;
        this.lowest_value = lowest_value;
    }


}