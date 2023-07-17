// title : UserController
// 설명 : 사용자의 정보에 대한 컨트롤을 하는 컨트롤러
//      프론트에서부터 axios로 넘긴 FormData를 받아 사용자 정보 조회, 사용자 닉네임 변경, 사용자 비밀번호 변경
// 작성자 : 심상혁
// 생성일 : 2023.05.16
// 업데이트 : -
package com.example.panda.controller;

import com.example.panda.dto.ChangePasswordDTO;
import com.example.panda.dto.UserDTO;
import com.example.panda.dto.UserResponseDTO;
import com.example.panda.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/account")   // 회원정보 수정 주소 넣기
public class UserController {
    private final UserService userService;

    @GetMapping("/me")  // 사용자 정보 가져오기
    public UserDTO getMyMemberInfo() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails)authentication.getPrincipal();
        UserDTO userDTO = userService.findbyId(userDetails.getUsername());

        return userDTO;
    }

    @PostMapping("/nickname")   // 닉네임 변경
    public ResponseEntity<UserResponseDTO> setMemberNickname(UserDTO userDTO) {
        return ResponseEntity.ok(userService.changeMemberNickname(userDTO.getEmail(), userDTO.getNickname()));
    }

    @PostMapping("/password")   // 비밀번호 변경
    public ResponseEntity<UserResponseDTO> setMemberPassword(@RequestBody ChangePasswordDTO request) {
        return ResponseEntity.ok(userService.changeMemberPassword(request.getEmail(), request.getExPassword(), request.getNewPassword()));
    }

    @PostMapping("/user") // 비밀번호 외 다른 정보(닉네임, 전화번호, 주소, 프로필 사진) 수정
    public ResponseEntity<UserResponseDTO> setMemberInfo(@RequestBody UserDTO userDTO) {
        return ResponseEntity.ok(userService.changeMemberInfo(userDTO));
    }
}
