package com.example.panda.repository;

import com.example.panda.entity.FavoriteEntity;
import com.example.panda.entity.WritingEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface WritingRepository extends JpaRepository<WritingEntity, Integer> {

//    @Query(value = "SELECT * FROM Writing WHERE writing_name LIKE :word " +
//            "OR category LIKE :word OR detail_category LIKE :word"
//            ,nativeQuery = true)
//    List<WritingEntity> findSearch(@Param("word") String word);

}
