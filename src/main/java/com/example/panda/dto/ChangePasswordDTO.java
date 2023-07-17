// title : ChangePasswordDTO
// 설명 : 사용자의 비밀번호 변경에 사용할 DTO
//      DB에서 사용자를 찾기위한 email과 현재 비밀번호 확인을 위한 exPassword, 변경할 비밀번호인 newPassword를 가진다.
// 작성자 : 심상혁
// 생성일 : 2023.05.16
// 업데이트 : -
package com.example.panda.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ChangePasswordDTO {
    private String email;
    private String exPassword;
    private String newPassword;
}
