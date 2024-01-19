// title : CustomUserDetailsService
// 설명 : 로그인에 사용하기위한 클래스
//      로그인에서 loadUserByUsername()사용
// 작성자 : 심상혁
// 생성일 : 2023.05.16
// 업데이트 : -
package com.example.panda.service;

import com.example.panda.dto.UserDTO;
import com.example.panda.entity.UserEntity;
import com.example.panda.repository.UserRepository;
import com.example.panda.security.SecurityUser;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;

@AllArgsConstructor
@Service
@Slf4j
public class CustomUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
//        if(email == null || email.equals("")) {
//            throw new UsernameNotFoundException(email);
//        }
//        return userRepository.findByEmail(email).map(this::createUserDetails)
//                .orElseThrow(() -> new UsernameNotFoundException(email + "을 찾을 수 없습니다."));
        Optional<UserEntity> findMember = userRepository.findByEmail(email);
        if (!findMember.isPresent()) throw new UsernameNotFoundException("존재하지 않는 이메일 입니다.");

        log.info("loadUserByUsername member.username = {}", email);

        return new SecurityUser(UserDTO.toUserDTO(findMember.get()));
    }

    private  UserDetails createUserDetails(UserEntity user){
        UserDTO userDTO = UserDTO.toUserDTO(user);
        GrantedAuthority grantedAuthority = new SimpleGrantedAuthority(userDTO.getAuthority().toString());
        return new User(String.valueOf(userDTO.getEmail()), userDTO.getPassword(), Collections.singleton(grantedAuthority));
    }
}
