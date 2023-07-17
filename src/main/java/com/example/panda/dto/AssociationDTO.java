package com.example.panda.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Data
@AllArgsConstructor
@Builder
public class AssociationDTO {
    private List<Integer> myList; //내가 구매한 리스트
    private HashMap<String,String> otherList; //다른 사람이 구매한 리스트

    public AssociationDTO(){
        myList=new ArrayList<>();
        otherList=new HashMap<>();
    }
}