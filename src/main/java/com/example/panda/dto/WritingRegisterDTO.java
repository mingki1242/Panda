package com.example.panda.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WritingRegisterDTO {

    private String writing_name;
    private byte[] writingImg;
    //    private String writingImg;
    private String category;
    private String detail_category;
    private int count;
    private int price;
    private String content;
    private int highest_value;
    private int buy_now;
    private int lowest_value;
    private int auction_flag;
    private int auction_date;
    private byte[] content_img;
    private byte[] content_img1;
    private byte[] content_img2;
}