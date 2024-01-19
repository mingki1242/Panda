/*
 * title : ChatRoomEntity
 * 설명 : 채팅방 DB의 Table에 맞는 ChatRoomEntity 클래스.
 *        MySQL에 알맞은 형식
 * 작성자 : 이승현
 * 생성일 : 2023.05.17
 * 업데이트 : -
 */
package com.example.panda.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Getter
@Setter
@Table(name = "Chat_room")
@AllArgsConstructor
@NoArgsConstructor
public class ChatRoomEntity {
    @Id // pk
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long room_id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="buyer")
    private UserEntity buyer;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="seller")
    private UserEntity seller;

    @Column (length = 1024)
    private String last_content;

    @Column
    private LocalDateTime last_date;

    @Column
    private Boolean is_no_read; // 안읽었는지?

    @Column
    private Boolean no_read_buyer; // buyer가 안읽었는지?

    @OneToOne
    @JoinColumn(name="wid")
    private WritingEntity writing;

    @Column
    private Integer evaluate_buyer;

    @Column
    private Integer evaluate_seller;

    @Column
    private Boolean is_exit_buyer;

    @Column
    private Boolean is_exit_seller;

}
