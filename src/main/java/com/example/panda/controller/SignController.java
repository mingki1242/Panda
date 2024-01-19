// title : SignController
// 설명 : 회원가입 및 로그인을 컨트롤하는 컨트롤러
//      프론트에서 axios로 넘긴 FormData를 받아 UserRequestDTO 인스턴스를 생성하여 회원가입을 요청한다.
//      프론트에서 axios로 넘긴 FormData를 받음. 로그인은 스프링 시큐리티에서 진행.
// 작성자 : 심상혁
// 생성일 : 2023.05.16
// 업데이트 : -
package com.example.panda.controller;

import com.example.panda.dto.UserDTO;
import com.example.panda.dto.UserResponseDTO;
import com.example.panda.service.SignService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
public class SignController {
    private final SignService signService;

    @PostMapping("/sign/joinMem")
    public ResponseEntity<UserResponseDTO> joinMem(@RequestBody UserDTO userDTO) {
        log.info("joinMem controller start");
        UserResponseDTO responseDTO = signService.joinMem((userDTO));
        if(responseDTO == null){
            return ResponseEntity.status(204).build();
        }
        return ResponseEntity.ok(signService.joinMem((userDTO)));
    }
    @GetMapping("/login")
    public HttpStatus login() {
        log.info("login controller start");
        return HttpStatus.OK;
    }

    @GetMapping("/check")
    public boolean loginCheck() {
        log.info("loginCheck controller start");
        return signService.isAuthenticated();
    }

    @GetMapping("/logout")
    public HttpStatus logout(HttpServletRequest request, HttpServletResponse response){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null) {
            new SecurityContextLogoutHandler().logout(request, response, auth);
        }
        log.info("logout");
        return HttpStatus.OK;
    }
}
