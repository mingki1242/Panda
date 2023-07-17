package com.example.panda.controller;

import com.example.panda.dto.WritingDTO;
import com.example.panda.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;


@RestController
@RequiredArgsConstructor
public class ChatController {

    private final ChatRoomService chatRoomService;

    @PostMapping("/joinChat")
    public Long joinChat(@RequestBody WritingDTO writingDTO){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails)authentication.getPrincipal();

        return chatRoomService.save(writingDTO.getWriting_Id(), userDetails.getUsername());
    }
}
