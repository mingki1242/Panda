import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useLocation, useNavigate } from 'react-router-dom';
import styles from "../Css_dir/notice.module.css";
import profile from "../imgs/logo512_512.png";
import Modal from 'react-modal';

function NoticeConfirm() {
    const movePage = useNavigate();
    const location = useLocation();
    const writingInfo = {...location.state};
    const listdata = new FormData();
    listdata.append('wid', writingInfo.word);
    const writingdata = new FormData();
    writingdata.append('wid', writingInfo.word);
    const [writingcontent , setWritingContent] = useState([]);
    const [data, setData] = useState({});
    const [isAuction, setIsAuction] = useState({"writing_Id": -1});
    const [auctionDate, setAuctionDate] = useState([]);
    const [isMaxOpen, setIsMaxOpen] = useState(false);
    const [maxPrice , setMaxPrice] = useState(""); //최고가 입력


    const closeMaxModal = () => {
        setIsMaxOpen(false);
    }

    const handleMaxPriceChange = (event) => {
        setMaxPrice(event.target.value);

    };
    const goMax = () => {
        setIsMaxOpen(true);
    }

    const goNoticePage = () => {
        movePage('/pages/noticePage');
    };
    const goLogin = () => {
        movePage('/pages/loginPage');
    }

    const goModify = () => {
        movePage('/pages/noticeModify');
    };

    const registerFavorite = () => {
        const favorite_regit = new FormData();
        favorite_regit.append('wid', writingInfo.word);
        axios
            .post('/api/favorite_register', favorite_regit, {    // notice말고 api로 할것
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((response) => {
                if (response.data === 1) alert('이미 등록한 제품입니다!');
                else if (response.data === 2) alert('자신의 제품을 찜 등록 할 수 없습니다!');
                else {
                    alert('정상 등록 되었습니다.');
                    window.location.reload();
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const goChat = () => {
        axios
            .post('/joinChat', {writing_Id: writingInfo.word}, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                window.open('/pages/Chat', '_blank');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        axios.post("/notice/writing_content" , writingdata,{
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then((response) => {
            setWritingContent(response.data);
            console.log(response.data);
            console.log("이미지 가져오기 성공");
        })
            .catch((error) => console.log(error));
    },[]);

    useEffect(() => {
        axios
            .post('/notice/favorite_writing', listdata, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((response) => {
                setData(response.data);
                console.log(response.data);
                axios
                    .get('/notice/isAuction?wid=' + response.data.writing_Id)
                    .then((r) => {
                        console.log(r.data);
                        if (r.data === "") {
                            console.log("non auction");
                            setIsAuction({"writing_Id": -1});
                            console.log({"writing_Id": -1});
                        } else {
                            setIsAuction(r.data);
                            const l = []
                            console.log(Array.isArray(isAuction.auction_date));
                            Array.isArray(r.data.auction_date) && r.data.auction_date.map((item, i) => {
                                if (i < 3) {
                                    if (i === 0) {
                                        l.push(item);
                                    }
                                    if (i > 0 && item < 10) {
                                        l.push("0" + item);
                                    } else if (i > 0) {
                                        l.push(item);
                                    }
                                }
                            });
                            console.log(l);
                            setAuctionDate(l);
                        }
                    })
                    .catch((error) => console.log(error));
            })
            .catch((error) => console.log(error));
    }, []);

    const [loginUser, setLoginUser] = useState(null)

    useEffect(() => {
        axios.get('/check')
            .then((response) => {
                console.log(response.data)
                if (response.data) {
                    console.log('now login');
                    axios.post('/api/saveInquiry', writingdata, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                        .then(response => console.log(response))
                        .catch(error => console.log(error))
                    axios.get('/api/UserInfo')
                        .then(response => {
                            setLoginUser(response.data);
                        })
                        .catch(error => {
                            console.log(error);
                        })
                    return true;
                } else {
                    console.log('need login');
                    document.cookie = "isLogin=false; path=/; expires=Thu, 01 JAN 1999 00:00:10 GMT";
                    sessionStorage.clear();
                }
            }).catch(error => {
                console.error(error);
                console.log('need login');
                document.cookie = "isLogin=false; path=/; expires=Thu, 01 JAN 1999 00:00:10 GMT";
                sessionStorage.clear();
            })
        }, []);

        const [lloginUser , setlloginUser] = useState(null);

        useEffect(()=> {
            axios.get('/api/UserInfo1')
                .then(response => {
                    setlloginUser(response.data);
                })
                .catch(error => {
                    console.log(error);
                })
        },[]);

        const deletePost = (postId) => {
            axios
                .delete(`/api/posts/${postId}`)
                .then((response) => {
                    alert('게시글 삭제가 완료되었습니다!!');
                    movePage('/pages/noticePage');
                })
                .catch((error) => {
                    alert('게시글이 존재하지 않거나 오류가 발생하여 삭제 할 수 없습니다');
                });
        };

        const handleDelete = () => {
            deletePost(writingInfo.word);
        };

    const submitMaxPrice = () => {
        if(maxPrice < isAuction.highest_value)
        {
            alert(`최고가(${isAuction.highest_value}원) 이상의 가격을 입력 해주세요.`);
            setMaxPrice(isAuction.highest_value);
            setIsMaxOpen(false);
        }
        else
        {
            const updateAuction = {
                highest_value: maxPrice,

            };
            axios
                .put(`/api/auction/${isAuction.wid}` , updateAuction)
                .then((response)=>{
                    alert("경매 최고가 업데이트 알림!!");
                    window.location.reload();
                })
                .catch((error) => {
                    alert("오류 체크 하세요");
                });
            setIsMaxOpen(false);
        }
    };
    return (
            <div>
                <div className={styles.board_wrap}>
                    <div className={styles.board_title}>
                        <strong>게시글 확인</strong>
                        <p>판매자가 등록한 물품정보를 확인 할 수 있습니다</p>
                    </div>
                    <div className={styles.board_view_wrap}>
                        <div className={styles.board_view}>
                            <div className={styles.title}>
                                <div>
                                    {data.writing_name}&nbsp;&nbsp;
                                    <span className={styles.favorite_count}>찜: {data.favorite_count}회</span>
                                </div>
                                {loginUser && data.userDTO && data.userDTO.email !== loginUser.email && (
                                    <button className={styles.favorite_btn} onClick={registerFavorite}>
                                        찜등록
                                    </button>
                                )}
                            </div>
                            <div className={styles.info}>
                                <dl>
                                    <dt>번호</dt>
                                    <dd>{writingInfo.word}</dd>
                                </dl>
                                <dl>
                                    <dt>글쓴이</dt>
                                    <dd>{data.user_name}</dd>
                                </dl>
                                <dl>
                                    <dt>가격</dt>
                                    <dd>{data.price}</dd>
                                </dl>

                            </div>
                            {isAuction.writing_Id !== -1 &&
                                <div>
                                    <h1>***경매상품***</h1>
                                    <div className={styles.info}>
                                        <dl>
                                            <dt>최저경매가</dt>
                                            <dd>{isAuction.lowest_value}</dd>
                                        </dl>
                                        <dl>
                                            <dt>현재 최고가</dt>
                                            {
                                                isAuction.userEntity !== null ?
                                                    <dd>{isAuction.highest_value + "원(" + isAuction.userEntity.nickname + ")"}</dd>
                                                    :
                                                    <dd>0</dd>
                                            }
                                        </dl>
                                        <dl>
                                            <dt>즉시구매가</dt>
                                            <dd>{isAuction.buy_now}</dd>
                                        </dl>
                                        <dl>
                                            <dt>경매종료일</dt>
                                            <dd>{auctionDate[0] + "."
                                                + auctionDate[1] + "."
                                                + auctionDate[2]}</dd>
                                        </dl>
                                    </div>
                                </div>}

                        </div>
                        <img alt="불러오는중" src={data.writingImg != null ? `${atob(data.writingImg)}` : profile}
                             style={{width: '70%'}}/>
                        <div
                            className={styles.cont}
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                fontSize: 26
                            }}>{data.content}
                        </div>
                        {writingcontent[0] != null &&
                        <img alt="불러오는중" src={`${atob(writingcontent[0].content_img)}`}
                             style={{width: '70%'}}/>}
                        <br/>
                        {writingcontent[1] != null &&
                            <img alt="불러오는중" src={`${atob(writingcontent[1].content_img)}`}
                                 style={{width: '70%'}}/>}
                        <br/>
                        {writingcontent[2] != null &&
                            <img alt="불러오는중" src={`${atob(writingcontent[2].content_img)}`}
                                 style={{width: '70%'}}/>}
                        <div className={styles.bt_wrap}>
                            {!loginUser && <button onClick={goLogin} className={styles.on}>
                                로그인하여 중고거래하기
                            </button>}
                            {loginUser && data.userDTO && data.userDTO.email !== loginUser.email && <button onClick={goNoticePage} className={styles.on}>
                                목록
                            </button>}
                            {loginUser && data.userDTO && data.userDTO.email !== loginUser.email && <button onClick={goChat} className={styles.on}>
                                채팅
                            </button>}
                            {/*{loginUser && data.userDTO && data.userDTO.email === loginUser.email && (*/}
                            {/*    <button onClick={goModify}>수정</button>*/}
                            {/*)}*/}
                            {loginUser && data.userDTO && data.userDTO.email === loginUser.email && (
                                <button onClick={handleDelete}>삭제</button>
                            )}
                            {loginUser && data.userDTO && data.userDTO.email !== loginUser.email && isAuction.writing_Id !== -1 && (
                                <button onClick={goChat} className={styles.on}>
                                    즉시구매(채팅)
                                </button>
                            )}
                            {loginUser && data.userDTO && data.userDTO.email !== loginUser.email && isAuction.writing_Id !== -1 && (
                                <button onClick={goMax} className={styles.on}>
                                    최고가 제시
                                </button>
                            )}
                            <Modal
                                isOpen={isMaxOpen}
                                onRequestClose={closeMaxModal}
                                ariaHideApp={false}
                                style={{
                                    content: {
                                        margin: '0 auto',
                                        marginTop: '10px',
                                        height: '80vh',
                                        backgroundColor: 'whitesmoke',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    },
                                    overlay: {
                                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                        zIndex: 30,
                                        textAlign: 'center',
                                    },
                                }}>
                                <div>
                                    <div className={styles.MaxHeader}>
                                        {"제시할 가격을 입력해 주세요\n(" + isAuction.highest_value + "원 이상)"}
                                    </div>

                                    <div className={styles.MaxBtn}>
                                        <form>
                                            <input type={"number"} value={maxPrice} onChange={handleMaxPriceChange}/>
                                            <br/>
                                            <button onClick={submitMaxPrice}>제시</button>
                                            <button onClick={closeMaxModal}>취소</button>
                                        </form>
                                    </div>
                                </div>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    export default NoticeConfirm;