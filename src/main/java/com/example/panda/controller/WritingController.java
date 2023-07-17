package com.example.panda.controller;

import com.example.panda.dto.*;
import com.example.panda.entity.AuctionEntity;
import com.example.panda.entity.UserEntity;
import com.example.panda.service.UserService;
import com.example.panda.service.WritingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.data.crossstore.ChangeSetPersister;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
public class WritingController {

    private final WritingService writingService;
    private final UserService userService;

    @PostMapping("/api/noticeRegister")
    public void boardwritepro(@RequestBody WritingRegisterDTO writingRegisterDTO) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        writingService.saveWriting(userDetails.getUsername(), writingRegisterDTO);
    }

    @RequestMapping("/api/noticePage")
    public List<WritingDTO> boardList() {
        List<WritingDTO> writingDTOList = writingService.findAll();
        return writingDTOList;
    }

    @GetMapping("/notice/noticeConfirm/{postId}")
    public WritingDTO getPost(@PathVariable int postId) {
        WritingDTO writingDTO = writingService.findById(postId);
        return writingDTO;
    }

    @GetMapping("/notice/isAuction")
    public AuctionEntity isAuction(@RequestParam("wid") int wid) {
        log.info("start isAuction");
        return writingService.isAuction(wid);
    }

    @GetMapping("/api/UserInfo")
    public UserEntity getUserInfo() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        UserEntity userEntity = userService.findbyEmail(userDetails.getUsername());
        return userEntity;
    }

    @GetMapping("/api/UserInfo1")
    public UserEntity getUserInfo1() {
        System.out.println("실행?");
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        UserEntity userEntity = userService.findbyEmail(userDetails.getUsername());
        return userEntity;
    }

    @DeleteMapping("/api/posts/{postId}")
    public void deletePost(@PathVariable Integer postId) throws ChangeSetPersister.NotFoundException {
        writingService.deletePost(postId);
    }

    @GetMapping("/api/myPosts")
    public List<WritingDTO> getMyPosts() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        UserEntity userEntity = userService.findbyEmail(userDetails.getUsername());

        String user_email = userEntity.getEmail();
        List<WritingDTO> myPosts = writingService.findByUserId(user_email);
        return myPosts;
    }

    @PutMapping("/api/auction/{writing_id}")
    public ResponseEntity<String> updateAuction(@PathVariable("writing_id") Long writing_id, @RequestBody AuctionDTO updateAuction) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        try {
            writingService.updateAuction(writing_id, updateAuction , userDetails.getUsername());
            return ResponseEntity.ok("경매 최고가 업데이트 완료");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("경매 최고가 업데이트 실패: " + e.getMessage());
        }
    }

    @PostMapping("/notice/writing_content")
    public List<WritingContentDTO> writingContent(@RequestParam("wid") int wid) {
        List<WritingContentDTO> writingContentDTO = writingService.findBycontentId(wid);
        if(writingContentDTO != null)
            return writingContentDTO;
        else return null;
    }

    @PostMapping("/api/analysis")
    public CategoryResponseDTO analysisImage(@RequestParam("image") String image) {
        RestTemplate restTemplate = new RestTemplate();

        // 요청 URL
        String url = "http://panda1562.iptime.org:5000/image";

        // 요청 헤더
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.TEXT_PLAIN);

        HttpEntity<String> requestEntity = new HttpEntity<>(image, headers);
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, requestEntity, String.class);

        if (response.getStatusCode().is2xxSuccessful()) {
            String detail_category = response.getBody();
            String[] categories = {"가구/인테리어", "가전제품", "문구/도서", "모바일/태블릿/PC", "반려동물", "뷰티", "생활용품", "스포츠", "식품", "의류", "자동차용품"};
            String[][] detail_categories = {
                    {"가구기타", "소파", "책상", "침대"},
                    {"가전기타", "TV", "냉장고", "청소기"},
                    {"도서/문구기타", "볼펜", "샤프/연필", "책"},
                    {"모바일/태블릿/PC기타", "노트북", "스마트폰", "태블릿"},
                    {"반려동물기타", "사료", "애견의류", "Toy"},
                    {"뷰티기타", "메이크업", "스킨케어", "클렌징", "헤어용품"},
                    {"생활용품기타", "욕실", "주방", "청소"},
                    {"스포츠기타", "농구", "야구", "축구", "헬스"},
                    {"식품기타", "과자", "라면", "빵", "생수"},
                    {"의류기타", "모자", "상의", "하의", "신발"},
                    {"자동차기타", "방향제", "블랙박스", "장식 악세사리"}
            };

            for (int i = 0; i < categories.length; i++) {
                for (int j = 0; j < detail_categories[i].length; j++) {
                    if (detail_categories[i][j].equals(detail_category)) {
                        if (j == 0) {
                            detail_category = "기타";
                        }
                        return new CategoryResponseDTO(categories[i], detail_category);
                    }
                }
            }
        }

        return null;
    }
}
