package com.example.panda.controller;

import com.example.panda.dto.*;
import com.example.panda.service.AdvertiseRandom;
import com.example.panda.service.AdvertiseService;
import com.example.panda.service.PurchaseHistoryService;
import com.example.panda.service.WritingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Slf4j
@RestController
@RequiredArgsConstructor
public class HomeController {
    private final AdvertiseService advertiseService;
    private final WritingService writingService;
    private final PurchaseHistoryService purchaseHistoryService;
    @GetMapping("/get/popular")
    public List<WritingResponseDTO> popularList(){  // 광고 + 인기 제품
        List<AdvertiseDTO> adList = advertiseService.todayADs();
        List<AdvertiseDTO> adList2= AdvertiseRandom.randFive(adList);
        List<WritingResponseDTO> popularList = writingService.findPopular();

        for(AdvertiseDTO advertiseDTO: adList2)
            popularList.add(0, advertiseDTO.getWritingResponseDTO());
        return popularList;
    }
    @PostMapping("/api/sendAssociation")
    public List<WritingResponseDTO> recAssociation(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails)authentication.getPrincipal();

        HashMap<String,StringBuilder> dataSet=new HashMap<>(); //사용자 별로 데이터 나누기 (key: userEmail, value: 사용자 당 구매한 이력들(StringBuilder))
        List<PurchaseHistoryDTO> purchaseHistoryAll=purchaseHistoryService.findAll(); //구매목록 일단 다 가져오기
        AssociationDTO associationDTO=new AssociationDTO();

        for(PurchaseHistoryDTO purchaseHistoryDTO:purchaseHistoryAll){
            if(dataSet.containsKey(purchaseHistoryDTO.getUserDTO().getEmail())){  //만약 해쉬맵에 이미 넣은 유저가 있을때 값을 넣어줌
                StringBuilder sb=dataSet.get(purchaseHistoryDTO.getUserDTO().getEmail());
                sb.append("/");
                sb.append(purchaseHistoryDTO.getWritingCompleteDTO().getWid());

                dataSet.put(purchaseHistoryDTO.getUserDTO().getEmail(),sb);
            }else{   //만약 해쉬맵에 이미 넣은 유저가 없다면 새로 만들어줌
                StringBuilder sb=new StringBuilder();
                sb.append(purchaseHistoryDTO.getWritingCompleteDTO().getWid());
                dataSet.put(purchaseHistoryDTO.getUserDTO().getEmail(),sb);
            }
        }
        dataSet.remove(userDetails.getUsername());  //자기꺼는 없애기
        log.info("dataSet : {}", dataSet);

        List<PurchaseHistoryDTO> purchaseHistoryDTOList=purchaseHistoryService.findbyEmail(userDetails.getUsername());  //사용자 본인의 구매이력 가져오기

        List<Integer> widList=new ArrayList<>();
        for(PurchaseHistoryDTO purchaseHistory: purchaseHistoryDTOList){   //wid 값만 넘겨주기
            widList.add(purchaseHistory.getWritingCompleteDTO().getWid());
        }



        associationDTO.setMyList(widList);
        for(String userName: dataSet.keySet()){
            associationDTO.getOtherList().put(userName,dataSet.get(userName).toString());  //StringBuilder -> String으로 변환해서 넘기기위해서
        }
        log.info("myList : {}",associationDTO.getMyList());
        log.info("otherList : {}",associationDTO.getOtherList());

        List<WritingDTO>writingDTOList=writingService.findAll();

        RestTemplate restTemplate = new RestTemplate();

        // 요청 URL
        String url = "http://panda1562.iptime.org:5000/api/sendAssociation";

        // 요청 헤더
        HttpHeaders headers=new HttpHeaders();

        headers.setContentType(MediaType.APPLICATION_JSON);

        // 요청 엔티티
        HttpEntity<AssociationDTO> requestEntity = new HttpEntity<>(associationDTO, headers);   //글 리스트를 보냄
        // HTTP POST 요청
        ResponseEntity<Map> responseEntity = restTemplate.exchange(url, HttpMethod.POST, requestEntity, Map.class);
        log.info("response : {}", responseEntity);
        Object responseList = responseEntity.getBody().get("list");
        log.info("responseList : {}", responseList);

        ArrayList<Integer> purchaseList = (ArrayList<Integer>) responseEntity.getBody().get("list");
        List<WritingResponseDTO> writingResponseDTOList = writingService.findResponseById(purchaseList);
        log.info("purchaseList : {}", writingResponseDTOList);
        return writingResponseDTOList;
    }
}
