package com.example.panda.repository;

import com.example.panda.entity.FavoriteEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FavoriteRepository extends JpaRepository<FavoriteEntity, Integer> {
//    @Query(value = "SELECT * FROM Favorite WHERE email= :email",nativeQuery = true)
//    List<FavoriteEntity> findByEmail(@Param("email") String email);

//    @Query(value = "SELECT * FROM Favorite WHERE wid= :wid",nativeQuery = true)
//    List<FavoriteEntity> findByWid(@Param("wid") int email);

//    @Query(value="DELETE FROM Favorite WHERE email= :email AND wid= :wid",nativeQuery = true)
//    @Modifying
//    void deleteFavorite(@Param("email") String email,@Param("wid") int wid);
    //DELETE FROM table_name WHERE id = 1105;
}
