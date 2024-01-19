// title : UserEntity
// 설명 : DB의 User table에 맞는 UserEntity.
//      email을 아이디로. 비밀번호, 전화번호, 닉네임, 주소, 포인트, 사용자 이미지를 가진다
//      authority는 DB에 사용하지 않으므로 enum타입으로 설정
// 작성자 : 심상혁
// 생성일 : 2023.05.16
// 업데이트 : -

package com.example.panda.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@Table(name = "User")
@NoArgsConstructor
@Builder
public class UserEntity {
    @Id
    @Column(name = "email")
    private String email;

    @Column(name = "password", nullable = false, length = 256)
    private String password;    // 비밀번호

    @Column(nullable = false, unique = true, length = 15, name = "phone_number")
    private String phoneNumber; // 전화번호(휴대폰)

    @Column(name = "nickname", nullable = false, length = 32)
    private String nickname;    // 닉네임

    @Column(nullable = false, length = 128, name = "address")
    private String address; //주소

    @Column(name = "point")
    @Builder.Default
    private int point = 0;  // 포인트(회원가입시 0포인트)

    @Column(name = "user_img")
    @Lob
    @Builder.Default
    private byte[] userImg = null;  // 사용자 이미지(회원가입시 기본 이미지)

    public void setNickname(String nickname) {  // 닉네임 변경
        this.nickname = nickname;
    }

    public void setPassword(String password) {  // 비밀번호 변경
        this.password = password;
    }

    // 빌더를 사용해 생성자
    @Builder
    public UserEntity(String email, String password, String phoneNumber, String nickname, String address, int point, byte[] userImg){
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.nickname = nickname;
        this.address = address;
        this.point = point;
        this.userImg = userImg;
    }
}
