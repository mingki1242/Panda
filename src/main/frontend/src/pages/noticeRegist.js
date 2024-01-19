import React, {useRef, useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import styles from "../Css_dir/notice.module.css";
import axios from 'axios';

const NoticeRegist = () => {
    const movePage = useNavigate();

    function alertmessage() {
        alert("정상 등록 되었습니다");
    }

    function nagative_alertmessage() {
        alert("등록 실패 !..");
    }

    function gonoticeAuction() {
        movePage('/pages/noticeAuction');
    }

    function gonoticepage() {
        movePage('/pages/noticePage');
    }

    const [writing_name, setTitle] = useState('');
    const [writing_photo, setWriting_photo] = useState(null); // Initialize with an empty string
    const [category, setCategory] = useState("의류");
    const [detail_category, setDetail_category] = useState('');
    const [count, setCount] = useState(0);
    const [price, setPrice] = useState(0);
    const [content, setContent] = useState('');
    const [windowSize, setWindowSize] = useState(window.innerWidth);
    const imageInput = useRef();

    const imageInput1 = useRef();
    const imageInput2 = useRef();
    const imageInput3 = useRef();

    const [writing_photo1, setWriting_photo1] = useState(null); // Initialize with an empty string
    const [writing_photo2, setWriting_photo2] = useState(null); // Initialize with an empty string
    const [writing_photo3, setWriting_photo3] = useState(null); // Initialize with an empty string

    //경매 정보
    const [auction_date, setAuctiondate] = useState('');
    const [highest_value, setHighestvalue] = useState(0);
    const [buy_now, setBuynow] = useState(0);
    const [lowest_value, setLowestvalue] = useState(0);
    const [visiable, setVisiable] = useState(false);

    const handleFileChange = (event) => {    //이미지 업로드
        if (event.target.files[0] == null) {
            return;
        }

        const file = event.target.files[0];

        const fileExtension = file.name.split('.').pop().toLowerCase();
        const allowedExtensions = ['jpg', 'jpeg', 'png'];

        if (!allowedExtensions.includes(fileExtension)) {
            alert('지원하는 이미지 파일이 아닙니다.');
            return;
        }


        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const imageUrl = reader.result;
                setWriting_photo(imageUrl);
                let fd = new FormData();
                fd.append("image", imageUrl);
                axios.post('/api/analysis', fd, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                    .then((response) => {
                        if(response.data !== '') {
                            let result = response.data;
                            console.log(result);
                            setCategory(result.category);
                            setDetail_category(result.detail_category);
                        }
                    })
                    .catch(error => {
                        alert('예상치 못한 오류!');
                    });
            };
            reader.readAsDataURL(file);
        }
        // const reader = new FileReader();
        // reader.onload = function (e) {
        //     setWriting_photo(e.target.result);
        // };
        // if (event.target.files.length > 0) { // Check if an image is selected
        //     reader.readAsDataURL(event.target.files[0]);
        // }
    };

    const handleFileChange1 = (event) => {    //이미지 업로드
        if (event.target.files[0] == null) {
            return;
        }

        const file = event.target.files[0];

        const fileExtension = file.name.split('.').pop().toLowerCase();
        const allowedExtensions = ['jpg', 'jpeg', 'png'];

        if (!allowedExtensions.includes(fileExtension)) {
            alert('지원하는 이미지 파일이 아닙니다.');
            return;
        }

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const imageUrl = reader.result;
                setWriting_photo1(imageUrl);
            };
            reader.readAsDataURL(file);
        }



        // const reader = new FileReader();
        // reader.onload = function (e) {
        //     setWriting_photo(e.target.result);
        // };
        // if (event.target.files.length > 0) { // Check if an image is selected
        //     reader.readAsDataURL(event.target.files[0]);
        // }
    };

    const handleFileChange2 = (event) => {    //이미지 업로드
        if (event.target.files[0] == null) {
            return;
        }

        const file = event.target.files[0];

        const fileExtension = file.name.split('.').pop().toLowerCase();
        const allowedExtensions = ['jpg', 'jpeg', 'png'];

        if (!allowedExtensions.includes(fileExtension)) {
            alert('지원하는 이미지 파일이 아닙니다.s');
            return;
        }

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const imageUrl = reader.result;
                setWriting_photo2(imageUrl);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleFileChange3 = (event) => {    //이미지 업로드
        if (event.target.files[0] == null) {
            return;
        }

        const file = event.target.files[0];

        const fileExtension = file.name.split('.').pop().toLowerCase();
        const allowedExtensions = ['jpg', 'jpeg', 'png'];

        if (!allowedExtensions.includes(fileExtension)) {
            alert('지원하는 이미지 파일이 아닙니다.');
            return;
        }

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const imageUrl = reader.result;
                setWriting_photo3(imageUrl);
            };
            reader.readAsDataURL(file);
        }
    };
    const imageSelectClick = () => {
        imageInput.current.click();
    };

    const registerInfo = () => {
        axios.get('/check')
            .then((response)=>{
                console.log(response.data)
                if(response.data){
                    console.log('now login');
                    if (writing_name === '') {
                        alert('글 제목을 입력해주세요!');
                        return;
                    }
                    if (category === '') {
                        alert('카테고리를 입력해주세요!');
                        return;
                    }
                    if (detail_category === '') {
                        alert('세부 카테고리를 입력해주세요!');
                        return;
                    }
                    if (!visiable) {
                        if (count === 0) {
                            alert('수량 입력해주세요!');
                            return;
                        }
                        if (price === 0) {
                            alert('금액을 0원으로 책정할 수 없습니다!');
                            return;
                        }
                    }
                    if (content === '') {
                        alert('글 내용을 입력해주세요!');
                        return;
                    }
                    if (auction_date > 7) {
                        alert('경매 마감일은 등록날짜로부터 최대 7일입니다. ');
                        return;
                    }


                    var auction_flag = 0;
                    if (visiable) {
                        auction_flag = 1;   //flag값
                        if (buy_now == 0 || lowest_value == 0) {
                            alert('즉시구매가와 경매시작가를 기입하지 않으면 0원으로 책정됩니다.');
                        }
                    }

                    const writing = {
                        writing_name: writing_name,
                        category: category,
                        detail_category: detail_category,
                        count: count,
                        price: price,
                        content: content,
                        writingImg: btoa(writing_photo),
                        auction_date: auction_date,
                        highest_value: highest_value,
                        buy_now: buy_now,
                        lowest_value: lowest_value,
                        auction_flag: auction_flag,
                        content_img: btoa(writing_photo1),
                        content_img1: btoa(writing_photo2),
                        content_img2: btoa(writing_photo3),
                    }
                    if(writing_photo1 === null){
                        writing["content_img"] = null;
                    }
                    if(writing_photo2 === null){
                        writing["content_img1"] = null;
                    }
                    if(writing_photo3 === null){
                        writing["content_img2"] = null;
                    }

                    axios.post('/api/noticeRegister', writing, {
                        headers: {
                            "Content-Type": "application/json",
                            "Access-Control-Allow-Origin": "http://localhost:8000",
                            "Access-Control-Allow-Credentials": "true",
                        },
                    })
                        .then((response) => {
                            alert('게시글 등록 및 경매 등록이 완료되었습니다.');
                            gonoticepage();
                        })
                        .catch(error => {
                            nagative_alertmessage();
                        });
                }
                else{
                    console.log('need login');
                    document.cookie = "isLogin=false; path=/; expires=Thu, 01 JAN 1999 00:00:10 GMT";
                    sessionStorage.clear();
                    alert('로그인이 필요합니다.');
                    movePage('/pages/loginPage');
                }
            }).catch(error=>{
            console.error(error);
            console.log('need login');
            document.cookie = "isLogin=false; path=/; expires=Thu, 01 JAN 1999 00:00:10 GMT";
            sessionStorage.clear();
            alert('로그인이 필요합니다.');
            movePage('/pages/loginPage');
        });
    };
    useEffect(()=> {
        const windowResize = () => {
            const width = window.innerWidth;
            setWindowSize(width);
        }

        window.addEventListener(`resize`, windowResize);

        return () => {
            window.removeEventListener(`resize`, windowResize);
        }
    }, []);

    return (
        <div>
            <div className={styles.board_wrapr}>
                <div className={styles.board_title}>
                    <strong>게시글 작성</strong>
                    <p>판매자는 하단 등록 버튼을 눌러 판매 등록을 할 수 있습니다.</p>
                </div>
                <form onSubmit={registerInfo} encType={"multipart/form-data"}>
                    <div className={styles.board_write_wrap}>
                        <div className={styles.board_write}>
                            <div className={styles.title}>
                                <dl>
                                    <dt>{/*<label htmlFor={writing_name}></label>*/}제목</dt>
                                    <dd><input type="text" id="writing_name" value={writing_name}
                                               placeholder="제목 입력" onChange={(e) => setTitle(e.target.value)}/></dd>
                                </dl>
                            </div>
                            <div className={styles.info}>
                                {windowSize <= 550 ?
                                    <table className={styles.info_table}>
                                        <tr>
                                            <td>
                                                <dl>
                                                    <dt>사진 등록</dt>
                                                    <dd id="photo_regist_dd">
                                                        <input type="file" ref={imageInput} name="writing_photo"
                                                               id="writing_photo"
                                                               onChange={handleFileChange}/>
                                                    </dd>
                                                </dl>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <dl>
                                                    <dt>대표 이미지 설정</dt>
                                                    <dd>
                                                        <img alt="미리보기" src={writing_photo} style={{maxWidth: "100px"}}/>
                                                    </dd>
                                                </dl>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <dl>
                                                    <dt>카테고리</dt>
                                                    <dd><select name="category" id="category" value={category}
                                                                onChange={(e) => {
                                                                    setCategory(e.target.value);
                                                                    if(e.target.value === "의류")
                                                                        setDetail_category("모자");
                                                                    else if(e.target.value === "뷰티")
                                                                        setDetail_category("메이크업");
                                                                    else if(e.target.value === "가구/인테리어")
                                                                        setDetail_category("침대");
                                                                    else if(e.target.value === "가전제품")
                                                                        setDetail_category("냉장고");
                                                                    else if(e.target.value === "모바일/태블릿/PC")
                                                                        setDetail_category("스마트폰");
                                                                    else if(e.target.value === "생활용품")
                                                                        setDetail_category("청소");
                                                                    else if(e.target.value === "반려동물")
                                                                        setDetail_category("사료");
                                                                    else if(e.target.value === "문구/도서")
                                                                        setDetail_category("책");
                                                                    else if(e.target.value === "스포츠")
                                                                        setDetail_category("축구");
                                                                    else if(e.target.value === "자동차용품")
                                                                        setDetail_category("방향제");
                                                                    else if(e.target.value === "식품")
                                                                        setDetail_category("생수");
                                                                    else if(e.target.value === "기타")
                                                                        setDetail_category("기타");
                                                                }}>
                                                        <option value={"의류"}>의류</option>
                                                        <option value={"뷰티"}>뷰티</option>
                                                        <option value={"가구/인테리어"}>가구/인테리어</option>
                                                        <option value={"가전제품"}>가전제품</option>
                                                        <option value={"모바일/태블릿/PC"}>모바일/태블릿/PC</option>
                                                        <option value={"생활용품"}>생활용품</option>
                                                        <option value={"반려동물"}>반려동물</option>
                                                        <option value={"문구/도서"}>문구/도서</option>
                                                        <option value={"스포츠"}>스포츠</option>
                                                        <option value={"자동차용품"}>자동차용품</option>
                                                        <option value={"식품"}>식품</option>
                                                        <option value={"기타"}>기타</option>
                                                    </select></dd>
                                                </dl>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <dl>
                                                    <dt>세부 카테고리</dt>
                                                    <dd><select name="detail_category" id="detail_category" value={detail_category}
                                                                onChange={(e) => setDetail_category(e.target.value)}>
                                                        {category==='의류'?(
                                                            <optgroup label={"의류"}>
                                                                <option value={"모자"}>모자</option>
                                                                <option value={"상의"}>상의</option>
                                                                <option value={"하의"}>하의</option>
                                                                <option value={"신발"}>신발</option>
                                                                <option value={"의류기타"}>기타</option>
                                                            </optgroup>
                                                        ):(
                                                            <></>
                                                        )}
                                                        {category==='뷰티'?(
                                                            <optgroup label={"뷰티"}>
                                                                <option value={"메이크업"}>메이크업</option>
                                                                <option value={"스킨케어"}>스킨케어</option>
                                                                <option value={"클렌징"}>클렌징</option>
                                                                <option value={"헤어용품"}>헤어용품</option>
                                                                <option value={"뷰티기타"}>기타</option>
                                                            </optgroup>
                                                        ):(
                                                            <></>
                                                        )}
                                                        {category==='가구/인테리어'?(
                                                            <optgroup label={"가구/인테리어"}>
                                                                <option value={"침대"}>침대</option>
                                                                <option value={"소파"}>소파</option>
                                                                <option value={"책상"}>책상</option>
                                                                <option value={"의자"}>의자</option>
                                                                <option value={"가구/인테리어기타"}>기타</option>
                                                            </optgroup>
                                                        ):(
                                                            <></>
                                                        )}
                                                        {category==='가전제품'?(
                                                            <optgroup label={"가전제품"}>
                                                                <option value={"냉장고"}>냉장고</option>
                                                                <option value={"TV"}>TV</option>
                                                                <option value={"청소기"}>청소기</option>
                                                                <option value={"에어컨"}>에어컨</option>
                                                                <option value={"가전제품기타"}>기타</option>
                                                            </optgroup>
                                                        ):(
                                                            <></>
                                                        )}
                                                        {category==='모바일/태블릿/PC'?(
                                                            <optgroup label={"모바일/태블릿/PC"}>
                                                                <option value={"스마트폰"}>스마트폰</option>
                                                                <option value={"태블릿"}>태블릿</option>
                                                                <option value={"노트북"}>노트북</option>
                                                                <option value={"모바일/태블릿/PC기타"}>기타</option>
                                                            </optgroup>
                                                        ):(
                                                            <></>
                                                        )}
                                                        {category==='생활용품'?(
                                                            <optgroup label={"생활용품"}>
                                                                <option value={"청소"}>청소</option>
                                                                <option value={"욕실"}>욕실</option>
                                                                <option value={"주방"}>주방</option>
                                                                <option value={"생활용품기타"}>기타</option>
                                                            </optgroup>
                                                        ):(
                                                            <></>
                                                        )}
                                                        {category==='반려동물'?(
                                                            <optgroup label={"반려동물"}>
                                                                <option value={"사료"}>사료</option>
                                                                <option value={"Toy"}>Toy</option>
                                                                <option value={"애견의류"}>애견의류</option>
                                                                <option value={"반려동물기타"}>기타</option>
                                                            </optgroup>
                                                        ):(
                                                            <></>
                                                        )}
                                                        {category==='문구/도서'?(
                                                            <optgroup label={"문구/도서"}>
                                                                <option value={"책"}>책</option>
                                                                <option value={"볼펜"}>볼펜</option>
                                                                <option value={"샤프/연필"}>샤프/연필</option>
                                                                <option value={"문구/도서기타"}>기타</option>
                                                            </optgroup>
                                                        ):(
                                                            <></>
                                                        )}
                                                        {category==='스포츠'?(
                                                            <optgroup label={"스포츠"}>
                                                                <option value={"축구"}>축구</option>
                                                                <option value={"야구"}>야구</option>
                                                                <option value={"농구"}>농구</option>
                                                                <option value={"헬스"}>헬스</option>
                                                                <option value={"스포츠기타"}>기타</option>
                                                            </optgroup>
                                                        ):(
                                                            <></>
                                                        )}
                                                        {category==='자동차용품'?(
                                                            <optgroup label={"자동차용품"}>
                                                                <option value={"방향제"}>방향제</option>
                                                                <option value={"장식 악세사리"}>장식 악세사리</option>
                                                                <option value={"블랙박스"}>블랙박스</option>
                                                                <option value={"자동차용품기타"}>기타</option>
                                                            </optgroup>
                                                        ):(
                                                            <></>
                                                        )}
                                                        {category==='식품'?(
                                                            <optgroup label={"식품"}>
                                                                <option value={"생수"}>생수</option>
                                                                <option value={"면"}>면</option>
                                                                <option value={"과자"}>과자</option>
                                                                <option value={"빵"}>빵</option>
                                                                <option value={"식품기타"}>식품</option>
                                                            </optgroup>
                                                        ):(
                                                            <></>
                                                        )}
                                                        {category==='기타'?(
                                                            <optgroup label={"기타"}>
                                                                <option value={"기타"}>기타</option>
                                                            </optgroup>
                                                        ):(
                                                            <></>
                                                        )}
                                                    </select></dd>
                                                </dl>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                {!visiable && (
                                                    <dl>
                                                        <dt>수량</dt>
                                                        <dd><input type="text" id="count" value={count}
                                                                   onChange={(e) => setCount(e.target.value)}/></dd>
                                                    </dl>)}

                                                {/*<dl>*/}
                                                {/*    <dt>수량</dt>*/}
                                                {/*    <dd><input type="text" id="count" value={count}*/}
                                                {/*               onChange={(e) => setCount(e.target.value)}/></dd>*/}
                                                {/*</dl>*/}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                {!visiable && (
                                                    <dl>
                                                        <dt>가격</dt>
                                                        <dd><input type="text" id="price" value={price}
                                                                   onChange={(e) => setPrice(e.target.value)}/></dd>
                                                    </dl>)}
                                                {/*<dl>*/}
                                                {/*    <dt>가격</dt>*/}
                                                {/*    <dd><input type="text" id="price" value={price}*/}
                                                {/*               onChange={(e) => setPrice(e.target.value)}/></dd>*/}
                                                {/*</dl>*/}
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <dl>
                                                    <dt>세부 사진1</dt>
                                                    <dd id="photo_regist_dd1">
                                                        <input type="file" ref={imageInput1} name="writing_photo1"
                                                               id="writing_photo1"
                                                               onChange={handleFileChange1}/>
                                                    </dd>
                                                </dl>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <dl>
                                                    <dt>세부 사진2</dt>
                                                    <dd id="photo_regist_dd2">
                                                        <input type="file" ref={imageInput2} name="writing_photo2"
                                                               id="writing_photo2"
                                                               onChange={handleFileChange2}/>
                                                    </dd>
                                                </dl>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <dl>
                                                    <dt>세부 사진3</dt>
                                                    <dd id="photo_regist_dd3">
                                                        <input type="file" ref={imageInput3} name="writing_photo3"
                                                               id="writing_photo3"
                                                               onChange={handleFileChange3}/>
                                                    </dd>
                                                </dl>
                                            </td>
                                        </tr>
                                        <td>
                                            <dl>
                                                <dt>세부 이미지 목록</dt>
                                                <dd>
                                                    <img alt="미리보기" src={writing_photo1} style={{maxWidth: "100px"}}/>
                                                    <img alt="미리보기" src={writing_photo2} style={{maxWidth: "100px"}}/>
                                                    <img alt="미리보기" src={writing_photo3} style={{maxWidth: "100px"}}/>
                                                </dd>
                                            </dl>
                                        </td>
                                    </table> :
                                    <table className={styles.info_table}>
                                        <tr>
                                            <td>
                                                <dl>
                                                    <dt>사진 등록</dt>
                                                    <dd id="photo_regist_dd">
                                                        <input type="file" ref={imageInput} name="writing_photo"
                                                               id="writing_photo"
                                                               onChange={handleFileChange}/>
                                                    </dd>
                                                </dl>
                                            </td>
                                            <td>
                                                <dl>
                                                    <dt>대표 이미지 설정</dt>
                                                    <dd>
                                                        <img alt="미리보기" src={writing_photo} style={{maxWidth: "100px"}}/>
                                                    </dd>
                                                </dl>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <dl>
                                                    <dt>카테고리</dt>
                                                    <dd><select name="category" id="category" value={category}
                                                                onChange={(e) => {
                                                                    setCategory(e.target.value);
                                                                    if(e.target.value === "의류")
                                                                        setDetail_category("모자");
                                                                    else if(e.target.value === "뷰티")
                                                                        setDetail_category("메이크업");
                                                                    else if(e.target.value === "가구/인테리어")
                                                                        setDetail_category("침대");
                                                                    else if(e.target.value === "가전제품")
                                                                        setDetail_category("냉장고");
                                                                    else if(e.target.value === "모바일/태블릿/PC")
                                                                        setDetail_category("스마트폰");
                                                                    else if(e.target.value === "생활용품")
                                                                        setDetail_category("청소");
                                                                    else if(e.target.value === "반려동물")
                                                                        setDetail_category("사료");
                                                                    else if(e.target.value === "문구/도서")
                                                                        setDetail_category("책");
                                                                    else if(e.target.value === "스포츠")
                                                                        setDetail_category("축구");
                                                                    else if(e.target.value === "자동차용품")
                                                                        setDetail_category("방향제");
                                                                    else if(e.target.value === "식품")
                                                                        setDetail_category("생수");
                                                                    else if(e.target.value === "기타")
                                                                        setDetail_category("기타");
                                                                }}>
                                                        <option value={"의류"}>의류</option>
                                                        <option value={"뷰티"}>뷰티</option>
                                                        <option value={"가구/인테리어"}>가구/인테리어</option>
                                                        <option value={"가전제품"}>가전제품</option>
                                                        <option value={"모바일/태블릿/PC"}>모바일/태블릿/PC</option>
                                                        <option value={"생활용품"}>생활용품</option>
                                                        <option value={"반려동물"}>반려동물</option>
                                                        <option value={"문구/도서"}>문구/도서</option>
                                                        <option value={"스포츠"}>스포츠</option>
                                                        <option value={"자동차용품"}>자동차용품</option>
                                                        <option value={"식품"}>식품</option>
                                                        <option value={"기타"}>기타</option>
                                                    </select></dd>
                                                </dl>
                                            </td>
                                            <td>
                                                <dl>
                                                    <dt>세부 카테고리</dt>
                                                    <dd><select name="detail_category" id="detail_category" value={detail_category}
                                                                onChange={(e) => setDetail_category(e.target.value)}>
                                                        {category==='의류'?(
                                                            <optgroup label={"의류"}>
                                                                <option value={"모자"}>모자</option>
                                                                <option value={"상의"}>상의</option>
                                                                <option value={"하의"}>하의</option>
                                                                <option value={"신발"}>신발</option>
                                                                <option value={"의류기타"}>기타</option>
                                                            </optgroup>
                                                        ):(
                                                            <></>
                                                        )}
                                                        {category==='뷰티'?(
                                                            <optgroup label={"뷰티"}>
                                                                <option value={"메이크업"}>메이크업</option>
                                                                <option value={"스킨케어"}>스킨케어</option>
                                                                <option value={"클렌징"}>클렌징</option>
                                                                <option value={"헤어용품"}>헤어용품</option>
                                                                <option value={"뷰티기타"}>기타</option>
                                                            </optgroup>
                                                        ):(
                                                            <></>
                                                        )}
                                                        {category==='가구/인테리어'?(
                                                            <optgroup label={"가구/인테리어"}>
                                                                <option value={"침대"}>침대</option>
                                                                <option value={"소파"}>소파</option>
                                                                <option value={"책상"}>책상</option>
                                                                <option value={"의자"}>의자</option>
                                                                <option value={"가구/인테리어기타"}>기타</option>
                                                            </optgroup>
                                                        ):(
                                                            <></>
                                                        )}
                                                        {category==='가전제품'?(
                                                            <optgroup label={"가전제품"}>
                                                                <option value={"냉장고"}>냉장고</option>
                                                                <option value={"TV"}>TV</option>
                                                                <option value={"청소기"}>청소기</option>
                                                                <option value={"에어컨"}>에어컨</option>
                                                                <option value={"가전제품기타"}>기타</option>
                                                            </optgroup>
                                                        ):(
                                                            <></>
                                                        )}
                                                        {category==='모바일/태블릿/PC'?(
                                                            <optgroup label={"모바일/태블릿/PC"}>
                                                                <option value={"스마트폰"}>스마트폰</option>
                                                                <option value={"태블릿"}>태블릿</option>
                                                                <option value={"노트북"}>노트북</option>
                                                                <option value={"모바일/태블릿/PC기타"}>기타</option>
                                                            </optgroup>
                                                        ):(
                                                            <></>
                                                        )}
                                                        {category==='생활용품'?(
                                                            <optgroup label={"생활용품"}>
                                                                <option value={"청소"}>청소</option>
                                                                <option value={"욕실"}>욕실</option>
                                                                <option value={"주방"}>주방</option>
                                                                <option value={"생활용품기타"}>기타</option>
                                                            </optgroup>
                                                        ):(
                                                            <></>
                                                        )}
                                                        {category==='반려동물'?(
                                                            <optgroup label={"반려동물"}>
                                                                <option value={"사료"}>사료</option>
                                                                <option value={"Toy"}>Toy</option>
                                                                <option value={"애견의류"}>애견의류</option>
                                                                <option value={"반려동물기타"}>기타</option>
                                                            </optgroup>
                                                        ):(
                                                            <></>
                                                        )}
                                                        {category==='문구/도서'?(
                                                            <optgroup label={"문구/도서"}>
                                                                <option value={"책"}>책</option>
                                                                <option value={"볼펜"}>볼펜</option>
                                                                <option value={"샤프/연필"}>샤프/연필</option>
                                                                <option value={"문구/도서기타"}>기타</option>
                                                            </optgroup>
                                                        ):(
                                                            <></>
                                                        )}
                                                        {category==='스포츠'?(
                                                            <optgroup label={"스포츠"}>
                                                                <option value={"축구"}>축구</option>
                                                                <option value={"야구"}>야구</option>
                                                                <option value={"농구"}>농구</option>
                                                                <option value={"헬스"}>헬스</option>
                                                                <option value={"스포츠기타"}>기타</option>
                                                            </optgroup>
                                                        ):(
                                                            <></>
                                                        )}
                                                        {category==='자동차용품'?(
                                                            <optgroup label={"자동차용품"}>
                                                                <option value={"방향제"}>방향제</option>
                                                                <option value={"장식 악세사리"}>장식 악세사리</option>
                                                                <option value={"블랙박스"}>블랙박스</option>
                                                                <option value={"자동차용품기타"}>기타</option>
                                                            </optgroup>
                                                        ):(
                                                            <></>
                                                        )}
                                                        {category==='식품'?(
                                                            <optgroup label={"식품"}>
                                                                <option value={"생수"}>생수</option>
                                                                <option value={"면"}>면</option>
                                                                <option value={"과자"}>과자</option>
                                                                <option value={"빵"}>빵</option>
                                                                <option value={"식품기타"}>식품</option>
                                                            </optgroup>
                                                        ):(
                                                            <></>
                                                        )}
                                                        {category==='기타'?(
                                                            <optgroup label={"기타"}>
                                                                <option value={"기타"}>기타</option>
                                                            </optgroup>
                                                        ):(
                                                            <></>
                                                        )}
                                                    </select></dd>
                                                </dl>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <dl>
                                                    <dt>수량</dt>
                                                    <dd><input type="text" id="count" value={count}
                                                               onChange={(e) => setCount(e.target.value)}/></dd>
                                                </dl>
                                            </td>
                                            <td>
                                                <dl>
                                                    <dt>가격</dt>
                                                    <dd><input type="text" id="price" value={price}
                                                               onChange={(e) => setPrice(e.target.value)}/></dd>
                                                </dl>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <dl>
                                                    <dt>세부 사진1</dt>
                                                    <dd id="photo_regist_dd1">
                                                        <input type="file" ref={imageInput1} name="writing_photo1"
                                                               id="writing_photo1"
                                                               onChange={handleFileChange1}/>
                                                    </dd>
                                                </dl>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <dl>
                                                    <dt>세부 사진2</dt>
                                                    <dd id="photo_regist_dd2">
                                                        <input type="file" ref={imageInput2} name="writing_photo2"
                                                               id="writing_photo2"
                                                               onChange={handleFileChange2}/>
                                                    </dd>
                                                </dl>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <dl>
                                                    <dt>세부 사진3</dt>
                                                    <dd id="photo_regist_dd3">
                                                        <input type="file" ref={imageInput3} name="writing_photo3"
                                                               id="writing_photo3"
                                                               onChange={handleFileChange3}/>
                                                    </dd>
                                                </dl>
                                            </td>
                                        </tr>
                                        <td>
                                            <dl>
                                                <dt>세부 이미지 목록</dt>
                                                <dd>
                                                    <img alt="미리보기" src={writing_photo1} style={{maxWidth: "100px"}}/>
                                                    <img alt="미리보기" src={writing_photo2} style={{maxWidth: "100px"}}/>
                                                    <img alt="미리보기" src={writing_photo3} style={{maxWidth: "100px"}}/>
                                                </dd>
                                            </dl>
                                        </td>
                                    </table>

                                }
                                <dl className={styles.needtop_margin}>
                                    <dd><a className={styles.on} onClick={() => {
                                        setVisiable(!visiable);
                                    }}> {visiable ? "닫기" : "경매등록▼"}</a></dd>

                                </dl>
                                <hr/>
                                {visiable && (
                                    <dl>
                                        <dt>경매 종료 시간 등록</dt>
                                        <dd><input type="text" id="auction_date" value={auction_date}
                                                   placeholder="숫자로 일수를 적어주세요(최대 7일)"
                                                   onChange={(e) => setAuctiondate(e.target.value)}/></dd>
                                    </dl>)}

                                {visiable && (<dl>
                                    <dt>경매 시작 가격</dt>
                                    <dd><input type="text" id="lowest_value" value={lowest_value}
                                               placeholder="경매 시작가를 입력하시오"
                                               onChange={(e) => setLowestvalue(e.target.value)}/></dd>
                                </dl>)}
                                {visiable && (<dl>
                                        <dt>즉시 구매 가격</dt>
                                        <dd><input type="text" id="buy_now" value={buy_now}
                                                   placeholder="즉시 구매가를 입력하시오"
                                                   onChange={(e) => setBuynow(e.target.value)}/></dd>
                                    </dl>
                                )}

                            </div>
                            <div className={styles.cont}>
                                    <textarea id="content" value={content} placeholder="제품 상세 설명을 입력하시오"
                                              onChange={(e) => setContent(e.target.value)}></textarea>
                            </div>

                        </div>
                        <div className={styles.bt_wrap}>
                            <a type="submit" className={styles.regist_btn_r} onClick={registerInfo}>등록</a>
                            <a onClick={gonoticepage}>취소</a>

                        </div>
                    </div>
                </form>
            </div>
        </div>
    );

}

export default NoticeRegist;