import React , {useState , useEffect} from 'react';
import {useNavigate, Link, useLocation} from 'react-router-dom';
import axios from 'axios';
import styles from "../Css_dir/notice.module.css";


function NoticePage(){
    const location=useLocation();
    const writingInfo = { ...location.state };
    const listdata=new FormData();
    listdata.append('wid', writingInfo.word);  //이전 페이지에서 받아온 글id
    const writingdata = new FormData();
    writingdata.append('wid',writingInfo.word);
    const navigate = useNavigate();

     const movePage1= (event)=>{
        const getId=event.currentTarget.id
        navigate('/pages/noticeConfirm?search='+getId, {state:{
                word:getId
            }});
    }

    function goregist()
    {
        axios.get('/check')
            .then((response)=>{
                console.log(response.data)
                if(response.data){
                    console.log('now login');
                    navigate('/pages/noticeRegist');
                }
                else{
                    console.log('need login');
                    document.cookie = "isLogin=false; path=/; expires=Thu, 01 JAN 1999 00:00:10 GMT";
                    sessionStorage.clear();
                    alert('로그인이 필요합니다.');
                    navigate('/pages/loginPage');
                }
            }).catch(error=>{
            console.error(error);
            console.log('need login');
            document.cookie = "isLogin=false; path=/; expires=Thu, 01 JAN 1999 00:00:10 GMT";
            sessionStorage.clear();
            alert('로그인이 필요합니다.');
            navigate('/pages/loginPage');});
    }

    function goconfirm()
    {
        navigate('/pages/noticeConfirm');
    }

    const [posts , setPosts] = useState([]);
    const [loginUser , setLoiginUser] = useState(null)

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        if (isNaN(date)) return ''; // 유효하지 않은 날짜인 경우 빈 문자열 반환
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
       axios.get('/api/myPosts')
            .then(response => {
            setPosts(response.data);
           })
           .catch(error => {
                console.log(error);
            });

    },[]);

    useEffect(() => {
        axios.get('/api/UserInfo')
            .then(response => {
                setLoiginUser(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    } , [])

    return (
            <div className={styles.wrap}>
                <div className={styles.board_wrap}>
                    <div className={styles.board_title}>
                        <strong>게시글 확인 및 등록</strong>
                        {loginUser && (
                            <p>{loginUser.nickname}님 반갑습니다. 하단 등록 버튼을 눌러 추가 게시글 등록을 할 수 있습니다.</p>
                            
                        )}
                    </div>
                    <div className={styles.border_list_wrap}>
                        <div className={styles.board_list}>
                            <div className={styles.top}>
                                <div className={styles.num}>번호</div>
                                <div className={styles.title}>제목</div>
                                <div className={styles.writer}>글쓴이</div>
                                <div className={styles.date}>작성일</div>
                                <div className={styles.count}>찜</div>
                            </div>
                            {posts.map(post => (
                                // loginUser && post.user_name === loginUser.nickname && (
                                    <div key={post.writing_Id}>
                                        <div className={styles.num}>{post.writing_Id}</div>
                                        <div className={styles.title} onClick={movePage1} id={post.writing_Id}>{post.writing_name}</div>
                                        <div className={styles.writer}>{post.user_name}</div>
                                        <div className={styles.date}>{formatDate(post.regit_date)}</div>
                                        <div className={styles.count}>{post.favorite_count}</div>
                                    </div>
                                    // )
                                 ))}

                        </div>

                        <div className={styles.bt_wrap}>
                            <button onClick={goregist} className={styles.on}>등록</button>
                        </div>
                    </div>
                </div>
            </div>



                );

            }

export default NoticePage;
