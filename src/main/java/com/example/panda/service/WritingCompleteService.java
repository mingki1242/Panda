package com.example.panda.service;

import com.example.panda.entity.WritingCompleteEntity;
import com.example.panda.entity.WritingEntity;
import com.example.panda.repository.WritingCompleteRepository;
import com.example.panda.repository.WritingRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class WritingCompleteService {
    private final WritingCompleteRepository writingCompleteRepository;
    private final WritingRepository writingRepository;
    public void save(int wid) {
        Optional<WritingEntity> writingEntityOptional = writingRepository.findById(wid);
        WritingCompleteEntity writingCompleteEntity = WritingCompleteEntity.writingToComplete(writingEntityOptional.get());

        writingCompleteRepository.save(writingCompleteEntity);
    }
}
