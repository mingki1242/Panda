package com.example.panda.service;

import com.example.panda.dto.FavoriteDTO;
import com.example.panda.entity.FavoriteEntity;
import com.example.panda.entity.UserEntity;
import com.example.panda.entity.WritingEntity;
import com.example.panda.repository.FavoriteDSLRepository;
import com.example.panda.repository.FavoriteRepository;
import com.example.panda.repository.UserRepository;
import com.example.panda.repository.WritingRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class FavoriteService {
    private final UserRepository userRepository;
    private final WritingRepository writingRepository;
    private final FavoriteRepository favoriteRepository;

    private final FavoriteDSLRepository favoriteDSLRepository;

    public List<FavoriteDTO> findByEmail(String email){   //DSL 적용

        List<FavoriteEntity> favoriteEntities2=favoriteDSLRepository.findByEmail(email);
        List<FavoriteDTO> favoriteDTOList=new ArrayList<>();

        for(FavoriteEntity favorite:favoriteEntities2){
            favoriteDTOList.add(FavoriteDTO.toFavoriteDTO(favorite));
        }

        return favoriteDTOList;
    }
    public List<FavoriteDTO> findByWid(int wid){
        List<FavoriteEntity> favoriteEntities=favoriteDSLRepository.findByWid(wid);
        List<FavoriteDTO> favoriteDTOList=new ArrayList<>();
        for(FavoriteEntity favorite:favoriteEntities){
            favoriteDTOList.add(FavoriteDTO.toFavoriteDTO(favorite));
        }
        return favoriteDTOList;
    }
    public int save(String email,int wid){
        FavoriteEntity favoriteEntity=new FavoriteEntity();
        Optional<UserEntity> userEntity=userRepository.findByEmail(email);
        Optional<WritingEntity> writingEntity=writingRepository.findById(wid);
        favoriteEntity.setUserEntity(userEntity.get());
        favoriteEntity.setWritingEntity(writingEntity.get());

//        List<FavoriteEntity> favoriteEntities=favoriteRepository.findByEmail(email);
//        for(FavoriteEntity favorite:favoriteEntities){
//            if(favorite.getUserEntity().getEmail().equals(email) && favorite.getWritingEntity().getWid()==wid) return 1;  //사용자가 이미 등록한 상품이면 등록 취소
//            if(writingEntity.get().getUserEntity().getEmail().equals(email)) return 2;   //사용자 자신이 올린 상품을 찜 등록할때 찜 등록 취소
//        }
        List<FavoriteEntity> favoriteEntities=favoriteDSLRepository.findByEmail(email);
        for(FavoriteEntity favorite:favoriteEntities){
            if(favorite.getUserEntity().getEmail().equals(email) && favorite.getWritingEntity().getWid()==wid) return 1;  //사용자가 이미 등록한 상품이면 등록 취소
            if(writingEntity.get().getUserEntity().getEmail().equals(email)) return 2;   //사용자 자신이 올린 상품을 찜 등록할때 찜 등록 취소
        }

        writingEntity.get().setFavorite_count(writingEntity.get().getFavorite_count()+1);
        writingRepository.save(writingEntity.get());
        favoriteRepository.save(favoriteEntity);
        return 3;
    }

    public void deleteFavorite(String email,int wid){
        Optional<WritingEntity> writingEntity=writingRepository.findById(wid);
        writingEntity.get().setFavorite_count(writingEntity.get().getFavorite_count()-1);
        writingRepository.save(writingEntity.get());   //찜 삭제시 게시글에 찜 카운팅-1
        favoriteDSLRepository.deleteFavorite(email,wid);
    }
}
