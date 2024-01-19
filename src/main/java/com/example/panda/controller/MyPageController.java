package com.example.panda.controller;

import com.example.panda.dto.*;
import com.example.panda.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class MyPageController {
    private final WritingService writingService;
    private final UserService userService;
    private final FavoriteService favoriteService;
    private final PurchaseHistoryService purchaseHistoryService;
    private final InquiryHistoryService inquiryHistoryService;
    @GetMapping("/api/writings")
    public List<WritingDTO> test(){
        List<WritingDTO> writingDTOList = writingService.findAll();
        return writingDTOList;
    }

    @PostMapping("/api/del_item")
    public void requestItem(@RequestParam("id")int id,
                            @RequestParam("writing_name")String writing_name,           //찜 삭제
                            @RequestParam("list")String list)  {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails)authentication.getPrincipal();
        String[] del_list=list.split(",");
        for(String st:del_list){
            favoriteService.deleteFavorite(userDetails.getUsername(),Integer.parseInt(st));
        }
    }

    @GetMapping("/api/list_totalPrice")   //프론트 내부에서 전체 리스트 계산 합 못 구함(정적 데이터만 계산 가능함)
    public int totalPrice(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails)authentication.getPrincipal();
        List<FavoriteDTO> favoriteDTOList = favoriteService.findByEmail(userDetails.getUsername());
        int sum=0;
        for(FavoriteDTO favoriteDTO : favoriteDTOList) sum+=favoriteDTO.getPrice();

        return sum;
    }

    @GetMapping("/api/favoriteList")   //찜 목록 조회(매개변수에 @RequestParam으로 세션값 받아와야함)
    public List<FavoriteDTO> favoriteList(){
        List<WritingDTO> writingDTOList=new ArrayList<>();
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails)authentication.getPrincipal();

        List<FavoriteDTO> favoriteDTOList=favoriteService.findByEmail(userDetails.getUsername());

        //System.out.println(userDetails.getUsername());

        return favoriteDTOList;
    }
    @PostMapping("/notice/favorite_writing")
    public WritingDTO favoriteWriting(@RequestParam("wid") int wid){  //해당 게시글 찜 등록한 사람 수 리턴
        List<WritingDTO> writingDTOList=new ArrayList<>();

//        List<FavoriteDTO> favoriteDTOList=favoriteService.findByWid(wid);   //나중에 글아이디 넣기
//        int count=favoriteDTOList.size();

        WritingDTO writingDTO=writingService.findById(wid); //찜 등록시 게시글에 찜 카운팅+1

        return writingDTO;
    }
    @PostMapping("/api/favorite_register")
    public int favoriteRegit(@RequestParam("wid") int wid){        //찜 등록
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails)authentication.getPrincipal();
        return favoriteService.save(userDetails.getUsername(),wid);
    }
    @PostMapping("/api/purchaseList")
    public List<PurchaseHistoryDTO> purchaseHistory(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails)authentication.getPrincipal();
        List<PurchaseHistoryDTO> list=purchaseHistoryService.findbyEmail(userDetails.getUsername());

//        System.out.println(list);
        return list;
    }

    @PostMapping("/api/saveInquiry")
    public void saveInquiry(@RequestParam("wid") int wid){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails)authentication.getPrincipal();

        inquiryHistoryService.save(userDetails.getUsername(),wid);
    }
    @GetMapping("/api/inquiryList")
    public List<WritingDTO> myInquiryList(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails)authentication.getPrincipal();
        List<WritingDTO> list=inquiryHistoryService.findbyEmail(userDetails.getUsername());  //WritingDTO를 반환함
        return list;
    }
}
