// title : UserResponseDTO
// 설명 : 사용자의 응답에 사용할 DTO
// 작성자 : 심상혁
// 생성일 : 2023.05.16
// 업데이트 : -
package com.example.panda.dto;

import com.example.panda.entity.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserResponseDTO {
    private String email;
    private String nickname;

    public static UserResponseDTO of(UserEntity user){
        return UserResponseDTO.builder()
                .email(user.getEmail())
                .nickname(user.getNickname())
                .build();
    }
}
