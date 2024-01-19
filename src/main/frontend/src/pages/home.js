import styles from '../Css_dir/home.module.css';
import { useNavigate } from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import ListVeiw from "./ListVeiw";
import axios from "axios";

function Home() {
    const movePage = useNavigate();
    let [recommend_item, setRecommendItem] = useState([]);   // 추천 제품 리스트
    let [popular, setPopular] = useState([]);   // 인기상품 + 광고 리스트\
    let [rend, setRend] = useState(true);

    useEffect(() => {   // 로그인 되었는지 확인
        axios.get('/check')
            .then((response)=>{
                console.log(response.data)
                if(response.data){
                    console.log('now login');
                    return true;
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
        const savedAssociation = sessionStorage.getItem("association");

        if(savedAssociation && savedAssociation.length !== 0){
            const parsedAssociation = JSON.parse(savedAssociation);
            setRecommendItem(parsedAssociation);
        }
        else {
            axios.post('/api/sendAssociation', null, {})
                .then((response) => {
                    console.log('추천 목록을 가져오는데 성공');
                    setRecommendItem(response.data);
                    console.log(response.data);
                    sessionStorage.setItem("association", JSON.stringify(response.data));
                }).catch((error) => {
                console.log(error);
            });
        }
        axios.get('/get/popular')   // 인기상품 + 광고 가져오기
            .then((response)=>{
                console.log('광고 + 인기 상품을 가져오는데 성공');
                setPopular(response.data);
            }).catch(error => {
            console.error(error);
        });
    },[]);

    function goCategorySearch(event){    //카테고리 검색
        console.log(event.currentTarget.id);
        const searchdata=new FormData();
        searchdata.append('word', event.currentTarget.id);
        movePage('/pages/SearchResult?search_popularity='+event.currentTarget.id, {state:{word:event.currentTarget.id}});
    }

    return (
        <div className={styles.App}>
            <div className={styles.home_page}>
                <div className={styles.home_wrap}>
                    <div className={styles.home_box}>
                        <section className={styles.top_section}>
                            <h1 className={styles.head}>추천 매물</h1>
                            <div className={styles.list_wrap}>
                                {/*{recommend_item.length !== 0 ? <ListVeiw list={recommend_item}></ListVeiw> : <ListVeiw></ListVeiw>}*/}
                                {recommend_item.length !== 0 ? <></>:<h3>다른사람의 제품을 구매해 다양한 추천을 받아보세요!</h3>}
                                {recommend_item.length !== 0 ? <ListVeiw list={recommend_item}></ListVeiw> :
                                    <ListVeiw list={popular}></ListVeiw>}
                            </div>
                        </section>
                        <section className={styles.mid_section}>
                            <h1 className={styles.head}>인기 매물</h1>
                            <div className={styles.rank_wrap}>
                                {popular.length !== 0 ? <ListVeiw list={popular}></ListVeiw>:<ListVeiw></ListVeiw>}
                            </div>
                            <div className={styles.more_wrap}>
                                <form name='search_popular' id='search_popular' method='get'>
                                    <input name='search_popular' id='search_popular' placeholder='  검색'defaultValue="" style={{ display: 'none' }}></input>
                                </form>
                                <a type="submit" form="search_popular" onClick={goCategorySearch} className={styles.more}>인기 매물 더 보기</a>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
            <footer className={styles.footer_div}>
                <div>ⒸPANDA</div>
                <div>주소지 : 경상북도 경산시 대학로 280</div>
                <div>광고 문의 : a1234567@email.com</div>
                <div>고객 문의(email) : b1234567@email.com</div>
                <div>고객 문의(call) : 000-0000-0000</div>
                <div> -오전 9:30 ~ 오후 5:30(주말,공휴일 제외)</div>
            </footer>
        </div>
    );
}

export default Home;