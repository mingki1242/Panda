package com.example.panda.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WritingContentRegisterDTO {
    private byte[] content_img;
    private byte[] content_img1;
    private byte[] content_img2;
}
