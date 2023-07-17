// title : UserDTO
// 설명 : 사용자의 요청에 사용할 DTO
// 작성자 : 심상혁
// 생성일 : 2023.05.16
// 업데이트 : -
package com.example.panda.dto;

import com.example.panda.entity.Authority;
import com.example.panda.entity.UserEntity;
import lombok.*;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

@Getter
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDTO {
    private String email;
    private String password;
    private String phoneNumber;
    private String nickname;
    private String address;
    private int point;
    private byte[] userImg;

    private Authority authority;


    public static UserDTO toUserDTO(UserEntity userEntity) {
        UserDTO userDTO = new UserDTO();
        userDTO.setEmail(userEntity.getEmail());
        userDTO.setPassword(userEntity.getPassword());
        userDTO.setPhoneNumber(userEntity.getPhoneNumber());
        userDTO.setNickname(userEntity.getNickname());
        userDTO.setAddress(userEntity.getAddress());
        userDTO.setPoint(userEntity.getPoint());
        userDTO.setAuthority(Authority.ROLE_USER);
        if (userEntity.getUserImg() != null)
            userDTO.setUserImg(userEntity.getUserImg());

        return userDTO;
    }
    public UserEntity toUser(PasswordEncoder passwordEncoder){
        return UserEntity.builder()
                .email(email)
                .password(passwordEncoder.encode(password))
                .nickname(nickname)
                .phoneNumber(phoneNumber)
                .address(address)
                .point(point)
                .userImg(userImg)
                .build();
    }
    public UsernamePasswordAuthenticationToken toAuthentication() {
        return new UsernamePasswordAuthenticationToken(email, password);
    }
}
