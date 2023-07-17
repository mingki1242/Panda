import styles from '../Css_dir/fixbar.module.css';
import React, {useEffect, useState} from 'react';
import {Routes,Route,Link,NavLink,useNavigate} from 'react-router-dom';

import axios from 'axios';
import OtherPage from "./OtherPage";
import OtherPage2 from "./OtherPage2";
import BoughtList from "./BoughtList";
import Inquiry_list from "./Inquiry_list";
import profile from '../imgs/logo512_512.png'
import SearchResult from "./SearchResult";

function FixBar() {
    const [data, setData] = useState([])


    useEffect(() => {
        axios.get('/account/me')
            .then(response => setData(response.data))
            .catch(error => console.log(error))
    }, []);

    return (
        <div>
            {/* black-nav */}

            {/* 마이페이지 */}
            <div className={styles.my_page}>
                <div className={styles.profile_background}>
                    <div className={styles.profile_image}>
                        <img src={data.userImg != null ? `${atob(data.userImg)}` : profile} width="100%" height="100%"/>
                    </div>
                    <div className={styles.profile_content}>
                        <div className={styles.p_nickname}>
                            {data.nickname}
                        </div>
                        <div className={styles.p_point}>
                            당신의 매너 점수는 {data.point}점 입니다.
                        </div>
                    </div>
                </div>
                <div className={styles.my_page_tab}>
                    <ul>
                        <li><Link to="/pages/OtherPage2">회원 정보</Link></li>
                        <li><Link to="/pages/OtherPage">찜 목록</Link></li>
                        <li><Link to="/pages/BoughtList">구매 이력</Link></li>
                        <li><Link to="/pages/Inquiry_list">조회 내역</Link></li>
                    </ul>
                </div>
            </div>
            <Routes>
                <Route path="/pages/OtherPage" element={<OtherPage/>}></Route>
                <Route path="/pages/OtherPage2" element={<OtherPage2/>}></Route>
                <Route path="/pages/BoughtList" element={<BoughtList/>}></Route>
                <Route path="/pages/Inquiry_list" element={<Inquiry_list/>}></Route>
            </Routes>
        </div>
    );
}

export default FixBar;