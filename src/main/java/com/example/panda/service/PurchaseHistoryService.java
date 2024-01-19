package com.example.panda.service;

import com.example.panda.dto.PurchaseHistoryDTO;
import com.example.panda.entity.PurchaseHistoryEntity;
import com.example.panda.entity.UserEntity;
import com.example.panda.entity.WritingCompleteEntity;
import com.example.panda.entity.WritingEntity;
import com.example.panda.repository.PurchaseHistoryDSLRepository;
import com.example.panda.repository.PurchaseHistoryRepository;
import com.example.panda.repository.UserRepository;
import com.example.panda.repository.WritingCompleteRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class PurchaseHistoryService {
    private final PurchaseHistoryRepository purchaseHistoryRepository;
    private final UserRepository userRepository;
    private final WritingCompleteRepository writingCompleteRepository;
    private final PurchaseHistoryDSLRepository purchaseHistoryDSLRepository;

    public void save(String email, int wid) {

        Optional<WritingCompleteEntity> optionalWritingCompleteEntity = writingCompleteRepository.findById(wid);
        Optional<UserEntity> optionalUserEntity = userRepository.findByEmail(email);

        if(optionalWritingCompleteEntity.isPresent() && optionalUserEntity.isPresent()) {
            WritingCompleteEntity writingCompleteEntity = optionalWritingCompleteEntity.get();
            UserEntity userEntity = optionalUserEntity.get();

            PurchaseHistoryEntity purchaseHistoryEntity = PurchaseHistoryEntity.toPurchaseHistoryEntity(userEntity, writingCompleteEntity);

            purchaseHistoryRepository.save(purchaseHistoryEntity);
        }
    }

    public List<PurchaseHistoryDTO> findbyEmail(String email){
        List<PurchaseHistoryEntity> purchaseHistoryEntities=purchaseHistoryDSLRepository.findByEmail(email);
        List<PurchaseHistoryDTO> purchaseHistoryDTOList=new ArrayList<>();
        for(PurchaseHistoryEntity purchaseHistory:purchaseHistoryEntities){
            purchaseHistoryDTOList.add(PurchaseHistoryDTO.toPurchaseHistoryDTO(purchaseHistory));
        }

        return purchaseHistoryDTOList;
    }

    public List<PurchaseHistoryDTO> findAll(){
        List<PurchaseHistoryEntity> purchaseHistoryEntities=purchaseHistoryRepository.findAll();
        List<PurchaseHistoryDTO> purchaseHistoryDTOList=new ArrayList<>();
        for(PurchaseHistoryEntity purchaseHistory:purchaseHistoryEntities){
            purchaseHistoryDTOList.add(PurchaseHistoryDTO.toPurchaseHistoryDTO(purchaseHistory));
        }
        return purchaseHistoryDTOList;
    }
}
