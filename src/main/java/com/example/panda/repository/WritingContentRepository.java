package com.example.panda.repository;

import com.example.panda.entity.WritingContentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WritingContentRepository extends JpaRepository<WritingContentEntity , Integer> {
    List<WritingContentEntity> findAllByWid(int wid);
}
