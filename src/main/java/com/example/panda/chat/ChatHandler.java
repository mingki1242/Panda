/* title : ChatHandler
 * 설명 : 채팅 페이지 접속 시 웹 소켓을 처리하기 위한 클래스
 * 작성자 : 이승현
 * 생성일 : 2023.05.18
 * 업데이트 : -
 */
package com.example.panda.chat;

import com.example.panda.dto.ChatRoomDTO;
import com.example.panda.dto.UserDTO;
import com.example.panda.service.ChatRoomService;
import com.example.panda.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import lombok.RequiredArgsConstructor;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
public class ChatHandler extends TextWebSocketHandler {
    private final ChatRoomService chatRoomService;
    private final UserService userService;
    private final WebSocketSessionManager webSocketSessionManager;

    
    // 채팅 페이지에 접속하면 자동으로 채팅목록을 가져와 보여줌
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws IOException {
        String email = (String) session.getAttributes().get("user");
        webSocketSessionManager.registerSession(email, session);

        UserDTO myInfo = userService.findbyId(email);
        List<ChatRoomDTO> chatRooms = chatRoomService.findByUserEmail(email);

        Map<String, Object> map = new HashMap<>();

        map.put("userImg", myInfo.getUserImg());
        map.put("email", email);
        map.put("chatRooms", chatRooms);

        if(session.isOpen()) {
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.registerModule(new JavaTimeModule()); // 직렬화 문제 해결
            String json = objectMapper.writeValueAsString(map);
            TextMessage textMessage = new TextMessage(json);
            session.sendMessage(textMessage);
        }
    }

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws IOException {

    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        String email = (String) session.getAttributes().get("user");

        webSocketSessionManager.removeSession(email);
        webSocketSessionManager.removeRoomId(email);
    }

}





