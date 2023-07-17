package com.example.panda.service;

import com.example.panda.dto.AdvertiseDTO;
import com.example.panda.dto.WritingDTO;

import java.util.*;

public class AdvertiseRandom {

    public static List<AdvertiseDTO> randFive(List<AdvertiseDTO> list){
        Random random=new Random();
        double probability;  //랜덤 값 돌린 결과
        int sum=0;
        double nowProps=0;     //반복문 진행 시 경과된 확률
        List<Double> propsArr=new ArrayList<>();  //각 광고의 확률 리스트
        List<AdvertiseDTO> list2=new ArrayList<>(); //확률에 뽑힌 리스트를 넣어주기
        Collections.sort(list, new Comparator<AdvertiseDTO>() {
            @Override
            public int compare(AdvertiseDTO w1, AdvertiseDTO w2) {
                // 광고비을 기준으로 내림차순 정렬
                return Integer.compare(w2.getAd_Price(), w1.getAd_Price());
            }
        });

        //list는  광고비 기준으로 내림차순으로 정렬되어있다. 마찬가지로 propArr도 똑같은 순서로 지정될 것
        for(AdvertiseDTO advertiseDTO:list) sum+=advertiseDTO.getAd_Price();
        for(AdvertiseDTO advertiseDTO:list) propsArr.add((advertiseDTO.getAd_Price()/(double)sum));

        for(int i=0;i<5;i++){    //i는 랜덤으로 몇개 뽑을지 정하는 변수(현재는 랜덤으로 5개 뽑음)
            probability=random.nextDouble();
            nowProps=0;
            for(int j=0;nowProps<1 && j<propsArr.size();j++){
                nowProps+=propsArr.get(j);
                if(probability<nowProps){
                    list2.add(list.get(j));
                    break;
                }
            }
        }
        return list2;
    }
}
