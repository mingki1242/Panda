package com.example.panda.service;

import com.example.panda.dto.*;
import com.example.panda.entity.*;
import com.example.panda.repository.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.data.crossstore.ChangeSetPersister;

import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class WritingService {
    //    @Autowired
    private final WritingRepository writingRepository;
    private final WritingDSLRepository writingDSLRepository;
    private final UserRepository userRepository;
    private final AuctionRepository auctionRepository;
    private final AuctionDSLRepository auctionDSLRepository;
    private final WritingContentRepository writingContentRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final ChatRoomDSLRepository chatRoomDSLRepository;

    public void write(WritingEntity we)
    {
        we.setFavorite_count(0);
        writingRepository.save(we);
    }

    public List<WritingDTO> findAll(){
        List<WritingEntity> writingEntityList = writingRepository.findAll();
        List<WritingDTO> writingDTOList = new ArrayList<>();

        for(WritingEntity writingEntity : writingEntityList) {
            writingDTOList.add(WritingDTO.toWritingDTO(writingEntity));
        }

        return writingDTOList;
    }
    public List<WritingDTO> findSearch(String word){
        List<WritingEntity> writingEntityList = writingDSLRepository.findSearch(word);
        List<WritingDTO> writingDTOList = new ArrayList<>();
        for(WritingEntity writingEntity : writingEntityList) {
            writingDTOList.add(WritingDTO.toWritingDTO(writingEntity));
        }
        return writingDTOList;
    }
    public List<WritingContentDTO> findBycontentId(int wid){
        List<WritingContentEntity> writingContentEntity = writingContentRepository.findAllByWid(wid);
        Iterator<WritingContentEntity> iter = writingContentEntity.iterator();
        List<WritingContentDTO> contentDTOList = new LinkedList<WritingContentDTO>();
        while(iter.hasNext()){
            WritingContentEntity wce = iter.next();
            if(wce != null)
                contentDTOList.add(WritingContentDTO.toWritingContentDTO(wce));
        }
        return contentDTOList;
    }
    public WritingDTO findById(int wid){
        Optional<WritingEntity> writingEntity = writingRepository.findById(wid);
        WritingDTO writingDTO=WritingDTO.toWritingDTO(writingEntity.get());
        return writingDTO;
    }

    public AuctionDTO findByauctionId(int wid){
        Optional<AuctionEntity> auctionEntity = auctionRepository.findById(wid);
        AuctionDTO auctionDTO=AuctionDTO.toAuctionDTO(auctionEntity.get());
        return auctionDTO;
    }

    public List<WritingResponseDTO> findResponseById(List<Integer> widList){
        List<WritingEntity> writingEntityList = writingDSLRepository.findByIdList(widList);
        List<WritingResponseDTO> writingResponseDTOList = new LinkedList<WritingResponseDTO>();
        for(WritingEntity we : writingEntityList){
            writingResponseDTOList.add(WritingResponseDTO.toWritingResponseDTO(we, false));
        }
        return writingResponseDTOList;
    }

    public List<WritingResponseDTO> findPopular(){
        List<WritingEntity> writingEntityList = writingDSLRepository.findPopularWriting();
        List<WritingResponseDTO> writingResponseDTOList = new LinkedList<>();
        for(WritingEntity we : writingEntityList){
            writingResponseDTOList.add(WritingResponseDTO.toWritingResponseDTO(we, false));
        }
        return writingResponseDTOList;
    }

    //게시글 삭제 로직 구현
    public void deletePost(Integer postId) throws ChangeSetPersister.NotFoundException {
        if(!writingRepository.existsById(postId))
        {
            throw new ChangeSetPersister.NotFoundException();
        }

        writingRepository.deleteById(postId);
    }

    public void saveWriting(String email, WritingRegisterDTO writingRegisterDTO){  //게시글과 옥션을 저장
        WritingDTO writingDTO=new WritingDTO();
        AuctionDTO auctionDTO=new AuctionDTO();
        List<WritingContentDTO> writingContentDTOlist = new LinkedList<WritingContentDTO>();


        writingDTO.setWriting_name(writingRegisterDTO.getWriting_name());
        writingDTO.setCategory(writingRegisterDTO.getCategory());
        if(writingRegisterDTO.getWritingImg()!=null){
            writingDTO.setWritingImg(writingRegisterDTO.getWritingImg());
        }

        writingDTO.setDetail_category(writingRegisterDTO.getDetail_category());
        writingDTO.setCount(writingRegisterDTO.getCount());
        writingDTO.setPrice(writingRegisterDTO.getPrice());
        writingDTO.setContent(writingRegisterDTO.getContent());


        WritingEntity writingEntity=WritingEntity.toWritingEntity(writingDTO);
        Optional<UserEntity> userEntity=userRepository.findByEmail(email);

        writingEntity.setUserEntity(userEntity.get());
        writingRepository.save(writingEntity);

        int wid = writingEntity.getWid();
        if(writingRegisterDTO.getContent_img()!=null){
            WritingContentDTO wd = new WritingContentDTO();
            wd.setContent_img(writingRegisterDTO.getContent_img());
            wd.setWid(wid);
            writingContentDTOlist.add(wd);
            log.info("img add");
            log.info("imga : {}", wd.getContent_img()[0]);
        }
        if(writingRegisterDTO.getContent_img1()!=null){
            WritingContentDTO wd1 = new WritingContentDTO();
            wd1.setContent_img(writingRegisterDTO.getContent_img1());
            wd1.setWid(wid);
            writingContentDTOlist.add(wd1);
            log.info("img add");
            log.info("imga : {}", wd1.getContent_img()[0]);
        }
        if(writingRegisterDTO.getContent_img2()!=null){
            WritingContentDTO wd2 = new WritingContentDTO();
            wd2.setContent_img(writingRegisterDTO.getContent_img2());
            wd2.setWid(wid);
            writingContentDTOlist.add(wd2);
            log.info("img add");
            log.info("imga : {}", wd2.getContent_img()[0]);
        }
        Iterator<WritingContentDTO> iter = writingContentDTOlist.iterator();
        while(iter.hasNext()){
            WritingContentDTO wd = iter.next();
            WritingContentEntity writingContentEntity = WritingContentEntity.toWritingContentEntity(wd);
            writingContentEntity.setWid(wid);
            log.info("img put");
            log.info("imgp : {}", writingContentEntity.getContent_img()[0]);
            writingContentRepository.save(writingContentEntity);
        }

        //System.out.println(writingEntity.getWid());

        if(writingRegisterDTO.getAuction_flag()==1){
            auctionDTO.setWid(writingEntity.getWid());
            auctionDTO.setHighest_value(writingRegisterDTO.getHighest_value());
            auctionDTO.setBuy_now(writingRegisterDTO.getBuy_now());
            auctionDTO.setLowest_value(writingRegisterDTO.getLowest_value());

            AuctionEntity auctionEntity=AuctionEntity.toAuctionEntity(auctionDTO,writingRegisterDTO.getAuction_date());
            auctionEntity.setUserEntity(null);
            auctionRepository.save(auctionEntity);
       }
    }
    public AuctionEntity isAuction(int wid){
        log.info("isAuctioning");
        Optional<AuctionEntity> optionalAuctionEntity = auctionDSLRepository.existsByWid(wid);
        return optionalAuctionEntity.orElse(null);
    }

    public List<WritingResponseDTO> findCheap() {
        List<WritingEntity> writingEntityList = writingDSLRepository.findCheapWriting();
        List<WritingResponseDTO> writingResponseDTOList = new LinkedList<>();
        for(WritingEntity we : writingEntityList){
            writingResponseDTOList.add(WritingResponseDTO.toWritingResponseDTO(we, false));
        }
        return writingResponseDTOList;
    }

    public List<WritingResponseDTO> findExpensive() {
        List<WritingEntity> writingEntityList = writingDSLRepository.findExpensiveWriting();
        List<WritingResponseDTO> writingResponseDTOList = new LinkedList<>();
        for(WritingEntity we : writingEntityList){
            writingResponseDTOList.add(WritingResponseDTO.toWritingResponseDTO(we, false));
        }
        return writingResponseDTOList;
    }

    public List<WritingDTO> findByUserId(String userEmail) {
        List<WritingEntity> writings = writingDSLRepository.findByUserEmail(userEmail);
        List<WritingDTO> writingDTOS = new ArrayList<>();
        for(WritingEntity writing : writings)
        {
            WritingDTO writingDTO = convertToDTO(writing);
            writingDTOS.add(writingDTO);
        }
        return writingDTOS;
    }

    private WritingDTO convertToDTO(WritingEntity writing) {
        WritingDTO writingDTO = new WritingDTO();
        writingDTO.setWriting_Id(writing.getWid());
        writingDTO.setWriting_name(writing.getWriting_name());
        writingDTO.setFavorite_count(writing.getFavorite_count());
        writingDTO.setRegit_date(writing.getRegit_date());
        writingDTO.setUser_name(writing.getUserEntity().getNickname());

        return writingDTO;
    }

    public void updateAuction(Long writingId, AuctionDTO updateAuction, String username) {
        AuctionEntity auction = auctionRepository.findById(Math.toIntExact(writingId))
                .orElseThrow(() -> new RuntimeException("경매 정보를 찾을 수 없습니다."));

        auction.setHighest_value(updateAuction.getHighest_value());

        Optional<UserEntity> userEntity=userRepository.findByEmail(username);
        auction.setUserEntity(userEntity.get());


        auctionRepository.save(auction);
    }

    //경매 시간 종료 처리
    @Scheduled(cron = "0 0 0 * * ?") // 분 마다 실행됨
    public void deleteExpiredAuctions(){
        LocalDateTime currentDateTime = LocalDateTime.now();

        List<AuctionEntity> auctionEntityList = writingDSLRepository.deleteByAuction_dateBefore(currentDateTime);
        // 삭제할 내용이 있으면 그것을 가져옴.

        if(auctionEntityList != null) { // -> 삭제할 내용이 있다는 의미 -> 채팅방을 만들어야 함.
            for(AuctionEntity auctionEntity : auctionEntityList) {  // 삭제할 내용 모두에 대하여 채팅방 개설
                UserEntity buyerEntity = auctionEntity.getUserEntity();     // Auction에 저장된 유저 -> 구매자

                if(buyerEntity == null) {
                    continue; // 구매자가 없으면 넘김
                }

                int wid = auctionEntity.getWid();   // wid를 가져옴
                Long roomId = chatRoomDSLRepository.findByBuyerEmailAndWid(buyerEntity.getEmail(), wid);
                if(roomId != null) { // 이미 채팅방이 있는지 확인 (즉시구매 등으로 인하여)
                    chatRoomRepository.setExitBuyerByRoomId(roomId, false);
                    continue;
                }

                WritingEntity writingEntity = writingRepository.findById(wid).get(); // 저장할 글을 가져옴

                UserEntity sellerEntity = writingEntity.getUserEntity();    // Writing에 저장된 유저 -> 판매자

                ChatRoomEntity chatRoomEntity
                        = new ChatRoomEntity(null, buyerEntity, sellerEntity, " ", null, false, false, writingEntity, 0, 0, false, false);
                chatRoomRepository.save(chatRoomEntity);    // 채팅방 개설
            }
        }
    }

}