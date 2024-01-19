package com.example.panda.controller;

import com.example.panda.dto.AdvertiseDTO;
import com.example.panda.dto.WritingDTO;
import com.example.panda.dto.WritingResponseDTO;
import com.example.panda.service.AdvertiseRandom;
import com.example.panda.service.AdvertiseService;
import com.example.panda.service.WritingService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.util.*;

@RestController
@RequiredArgsConstructor
public class SearchController {
    private final WritingService writingService;
    private final AdvertiseService advertiseService;
    @PostMapping(value="/api/searchResult",produces = "application/json; charset=UTF-8")
    public LinkedHashSet<WritingDTO> searching(@RequestParam("search_word") String word, @RequestParam("sort") String sort){
        //List<WritingDTO> writingDTOList = writingService.findSearch("%"+java.net.URLDecoder.decode(word, StandardCharsets.UTF_8)+"%");
        List<WritingDTO> writingDTOList = new ArrayList<>();
        String[] strarr=word.split("[_.~]");

        for(String str:strarr){
            writingDTOList.addAll(writingService.findSearch("%"+java.net.URLDecoder.decode(str, StandardCharsets.UTF_8)+"%"));
        }

        if(sort.equals("search_popularity")){   //인기순(찜순) 정렬
            Collections.sort(writingDTOList, new Comparator<WritingDTO>() {
                @Override
                public int compare(WritingDTO w1, WritingDTO w2) {
                    // 찜순을 기준으로 정렬
                    return Integer.compare(w2.getFavorite_count(), w1.getFavorite_count());
                }
            });
        }
        else if(sort.equals("search_price")){   //가격순 정렬
            Collections.sort(writingDTOList, new Comparator<WritingDTO>() {
                @Override
                public int compare(WritingDTO w1, WritingDTO w2) {
                    // 가격을 기준으로 정렬(오름차순-싼거먼저)
                    return Integer.compare(w1.getPrice(), w2.getPrice());
                }
            });
        }
        else if(sort.equals("search_sell")){ //판매순 정렬(추후에 Writing_complete 테이블이랑 Writing테이블 같이봐야함)

        }

        LinkedHashSet<WritingDTO> setWritingDTOs=new LinkedHashSet<>();
        for(WritingDTO writingDTO: writingDTOList) setWritingDTOs.add(writingDTO);

        return setWritingDTOs;
    }

    @PostMapping("/api/todayAds")
    public List<WritingResponseDTO> todayList(){  //현재 남아있는 광고 중 가장 비싼 가격을 지불한 게시글 5개를 랜덤으로 뽑아서 프론트로 보냄

//        List<AdvertiseDTO> list=advertiseService.todayADs();
//        for(AdvertiseDTO advertiseDTO:list){
//            System.out.println(advertiseDTO);
//        }
//        System.out.println("여기까지!");
        List<AdvertiseDTO> list=advertiseService.todayADs();
        List<AdvertiseDTO> list2= AdvertiseRandom.randFive(list);
        System.out.println(list2);

        List<WritingResponseDTO> writingDTOList=new ArrayList<>();
        for(AdvertiseDTO advertiseDTO: list2) writingDTOList.add(advertiseDTO.getWritingResponseDTO());
       return writingDTOList;
    }
}
