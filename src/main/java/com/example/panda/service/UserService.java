// title : UserService
// 설명 : 사용자 서비스
// 작성자 :
// 생성일 : 2023.05.16
// 업데이트 : -
package com.example.panda.service;

import com.example.panda.dto.UserDTO;
import com.example.panda.dto.UserResponseDTO;
import com.example.panda.entity.UserEntity;
import com.example.panda.repository.UserRepository;
import com.example.panda.repository.UserSaveRepository;
import com.example.panda.security.SecurityUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserSaveRepository userSaveRepository;
    private final PasswordEncoder passwordEncoder;

    public UserDTO findbyId(String id){      //UserDTO리턴
        Optional<UserEntity> userEntity=userRepository.findByEmail(id);
        UserDTO userDTO=UserDTO.toUserDTO(userEntity.get());
        return userDTO;
    }

    public UserEntity findbyEmail(String id){   //UserEntity리턴
        Optional<UserEntity> userEntity=userRepository.findByEmail(id);
        return userEntity.get();
    }

    // 사용자 정보 가져오는 함수
    public UserResponseDTO getMyInfoBySecurity() {
        return userRepository.findByEmail(SecurityUtil.getCurrentMemberId())
                .map(UserResponseDTO::of)
                .orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다"));
    }

    // 닉네임 변경 함수
    @Transactional
    public UserResponseDTO changeMemberNickname(String email, String nickname) {
        UserEntity user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다"));
        user.setNickname(nickname);
        return UserResponseDTO.of(userSaveRepository.save(user));
    }

    // 비밀번호 변경 함수
    @Transactional
    public UserResponseDTO changeMemberPassword(String email, String exPassword, String newPassword) {
        UserEntity user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다"));
        if (!passwordEncoder.matches(exPassword, user.getPassword())) {
            throw new RuntimeException("비밀번호가 맞지 않습니다");
        }
        user.setPassword(passwordEncoder.encode((newPassword)));
        return UserResponseDTO.of(userSaveRepository.save(user));
    }

    // 사용자 평가 점수 반영 함수
    @Transactional
    public UserResponseDTO changeMemberPoint(String email, int point) {
        UserEntity user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다"));
        user.setPoint(user.getPoint() + point);
        return UserResponseDTO.of(userSaveRepository.save(user));
    }

    // 사용자 정보 수정(닉네임, 전화번호, 주소, 프로필 이미지 등) 함수
    @Transactional
    public UserResponseDTO changeMemberInfo(UserDTO userDTO) {
        UserEntity user = userRepository.findByEmail(userDTO.getEmail()).orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다"));
        user.setNickname(userDTO.getNickname());
        user.setPhoneNumber(userDTO.getPhoneNumber());
        user.setAddress(userDTO.getAddress());
        user.setUserImg(userDTO.getUserImg());

        return UserResponseDTO.of(userSaveRepository.save(user));
    }
}
