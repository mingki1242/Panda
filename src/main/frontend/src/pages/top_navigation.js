import styles from '../Css_dir/navigation.module.css';
import {Link, useNavigate} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import logo from '../imgs/logo192_192.png';
import green_logo from '../imgs/green_logo_192_192.png';
import Sidebar from "./sidebar";
import Searchbar from "./searchbar";
import axios from "axios";
import style from "../Css_dir/sidebarCategory.module.css";


function TopNav() {
    const movePage = useNavigate();
    const [inputText, setInputText] = useState('');

    function goHome() {
        movePage('/');
    }
    function goSearchResult(){   //입력해서 검색
        const query='input[id=search_input]';
        const searchElement=document.querySelector(query);
        const search_word=searchElement.value;

        const singleConsonantRegex = /[ㄱ-ㅎ | ㅏ-ㅣ]{1}$/;
        //const singleVowelRegex = /[ㅏ-ㅣ]{1}$/;
        // singleConsonantRegex.test(inputText);  //한글자음 1개만 입력했는지 확인
        // //singleVowelRegex.test(inputText);      //한글모음 1개만 입력했는지 확인



        if(inputText.length >=1 && singleConsonantRegex.test(inputText)==false){
            const searchdata=new FormData();
            searchdata.append('word', search_word);
            movePage('/pages/SearchResult?search='+search_word, {state:{word:search_word}});
        }else{
            alert('자음, 모음 1글자 입력은 안됩니다!');
        }
    }
    function goCategorySearch(event){    //카테고리 검색
        console.log(event.currentTarget.id);
        const searchdata=new FormData();
        searchdata.append('word', event.currentTarget.id);
        movePage('/pages/SearchResult?search='+event.currentTarget.id, {state:{word:event.currentTarget.id}});
    }

    function goLogin() {
        movePage('/pages/loginPage');
    }
    function logout(){
        axios.get('/logout')
            .then((response)=> {
                if(response.status === 200) {
                    console.log('로그아웃 성공');
                    document.cookie = "isLogin=false; path=/; expires=Thu, 01 JAN 1999 00:00:10 GMT";
                    sessionStorage.clear();
                    alert('로그아웃 되었습니다.');
                    movePage('/');
                    window.location.reload();
                }
                else {
                    console.log('로그아웃 실패');
                    alert('로그아웃 실패');
                }
            })
            .catch(error => {
                console.error(error);
                console.log('로그아웃 실패');
                alert('로그아웃 실패');
            });
    }

    function goNotice()
    {
        axios.get('/check')
            .then((response)=>{
                console.log(response.data)
                if(response.data){
                    console.log('now login');
                    movePage('/pages/noticePage');
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
    }

    function goMypage()
    {
        axios.get('/check')
            .then((response)=>{
                console.log(response.data)
                if(response.data){
                    console.log('now login');
                    movePage('/pages/OtherPage2');
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
    }

    function goChat(){
        movePage('/pages/Chat');
    }

    const handleInputChange=(e)=>{
        setInputText(e.target.value);
    }

    return (
        <div className={styles.black_nav}>
            <div className={styles.logo_box} onClick={goHome} >
                <h1 className={styles.logo}>
                    <a className={styles.home_link}>
                        <div className={styles.logo_img_wrap}>
                            <img src={green_logo} alt='panda' width={21} height={21} className={styles.green_logo_img}></img>
                            <img src={logo} alt='panda' width={21} height={21} className={styles.logo_img}></img>
                        </div>
                        <span className={styles.need_img}>PANDA</span>
                    </a>
                </h1>
            </div>
            <nav className={styles.left_nav}>
                <ul className={styles.top_list}>
                    <div className={styles.category_wrap}>
                        <li className={`${styles.tlist_item} ${styles.category}`}>
                            <a className={styles.tlist_item_a}>
                                <span className={styles.tlist_text}>카테고리 ▼</span>
                            </a>
                        </li>
                        <div className={styles.category_content}>
                            <div className={styles.category_item}>
                                <a onClick={goCategorySearch} id="의류">
                                    <div className={styles.line}></div>
                                    <form name='search_clothes' id='search_clothes' method='get'>
                                        <input name='search_clothes' id='search_clothes' placeholder='  검색'defaultValue="의류" style={{ display: 'none' }}></input>
                                    </form>
                                    <button type="submit" form="search_clothes" onClick={goCategorySearch} className={styles.category_btn}>의류</button>
                                </a>
                                <div>
                                    <ul>
                                        <li className={styles.category_d}>
                                            <div className={styles.line}></div>
                                            <form name='search_hat' id='search_hat' method='get'>
                                                <input name='search_hat' id='search_hat' placeholder='  검색'defaultValue="모자" style={{ display: 'none' }}></input>
                                            </form>
                                            <button type="submit" form="search_hat" onClick={goCategorySearch} className={styles.category_btn}>모자</button>
                                        </li>
                                        <li className={styles.category_d}>
                                            <div className={styles.line}></div>
                                            <form name='search_topClothes' id='search_topClothes' method='get'>
                                                <input name='search_topClothes' id='search_topClothes' placeholder='  검색'defaultValue="상의" style={{ display: 'none' }}></input>
                                            </form>
                                            <button type="submit" form="search_topClothes" onClick={goCategorySearch} className={styles.category_btn}>상의</button>
                                        </li>
                                        <li className={styles.category_d}>
                                            <div className={styles.line}></div>
                                            <form name='search_bottomClothes' id='search_bottomClothes' method='get'>
                                                <input name='search_bottomClothes' id='search_bottomClothes' placeholder='  검색'defaultValue="하의" style={{ display: 'none' }}></input>
                                            </form>
                                            <button type="submit" form="search_bottomClothes" onClick={goCategorySearch} className={styles.category_btn}>하의</button>
                                        </li>
                                        <li className={styles.category_d}>
                                            <div className={styles.line}></div>
                                            <form name='search_shoes' id='search_shoes' method='get'>
                                                <input name='search_shoes' id='search_shoes' placeholder='  검색'defaultValue="신발" style={{ display: 'none' }}></input>
                                            </form>
                                            <button type="submit" form="search_shoes" onClick={goCategorySearch} className={styles.category_btn}>신발</button>
                                        </li>
                                        <li className={styles.category_d}>
                                            <div className={styles.line}></div>
                                            <form name='search_clothesElse' id='search_clothesElse' method='get'>
                                                <input name='search_clothesElse' id='search_clothesElse' placeholder='  검색'defaultValue="의류기타" style={{ display: 'none' }}></input>
                                            </form>
                                            <button type="submit" form="search_clothesElse" onClick={goCategorySearch} className={styles.category_btn}>의류기타</button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className={styles.category_item}>
                                <a onClick={goCategorySearch} id="뷰티">
                                    <div className={styles.line}></div>
                                    <form name='search_beauty' id='search_beauty' method='get'>
                                        <input name='search_beauty' id='search_beauty' placeholder='  검색'defaultValue="뷰티" style={{ display: 'none' }}></input>
                                    </form>
                                    <button type="submit" form="search_beauty" onClick={goCategorySearch} className={styles.category_btn}>뷰티</button>
                                </a>
                                <div>
                                    <ul>
                                        <li className={styles.category_d}>
                                            <div className={styles.line}></div>
                                            <form name='search_makeup' id='search_makeup' method='get'>
                                                <input name='search_makeup' id='search_makeup' placeholder='  검색'defaultValue="메이크업" style={{ display: 'none' }}></input>
                                            </form>
                                            <button type="submit" form="search_makeup" onClick={goCategorySearch} className={styles.category_btn}>메이크업</button>
                                        </li>
                                        <li className={styles.category_d}>
                                            <div className={styles.line}></div>
                                            <form name='search_skincare' id='search_skincare' method='get'>
                                                <input name='search_skincare' id='search_skincare' placeholder='  검색'defaultValue="스킨케어" style={{ display: 'none' }}></input>
                                            </form>
                                            <button type="submit" form="search_skincare" onClick={goCategorySearch} className={styles.category_btn}>스킨케어</button>
                                        </li>
                                        <li className={styles.category_d}>
                                            <div className={styles.line}></div>
                                            <form name='search_cleansing' id='search_cleansing' method='get'>
                                                <input name='search_cleansing' id='search_cleansing' placeholder='  검색'defaultValue="클렌징" style={{ display: 'none' }}></input>
                                            </form>
                                            <button type="submit" form="search_cleansing" onClick={goCategorySearch} className={styles.category_btn}>클렌징</button>
                                        </li>
                                        <li className={styles.category_d}>
                                            <div className={styles.line}></div>
                                            <form name='search_hairP' id='search_hairP' method='get'>
                                                <input name='search_hairP' id='search_hairP' placeholder='  검색'defaultValue="헤어용품" style={{ display: 'none' }}></input>
                                            </form>
                                            <button type="submit" form="search_hairP" onClick={goCategorySearch} className={styles.category_btn}>헤어용품</button>
                                        </li>
                                        <li className={styles.category_d}>
                                            <div className={styles.line}></div>
                                            <form name='search_beautyElse' id='search_beautyElse' method='get'>
                                                <input name='search_beautyElse' id='search_beautyElse' placeholder='  검색'defaultValue="뷰티기타" style={{ display: 'none' }}></input>
                                            </form>
                                            <button type="submit" form="search_beautyElse" onClick={goCategorySearch} className={styles.side_category_btn}>뷰티기타</button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className={styles.category_item}>
                                <a onClick={goCategorySearch} id="가구_인테리어">
                                    <div className={styles.line}></div>
                                    <form name='search_furniture' id='search_furniture' method='get'>
                                        <input name='search_furniture' id='search_furniture' placeholder='  검색'defaultValue="가구_인테리어" style={{ display: 'none' }}></input>
                                    </form>
                                    <button type="submit" form="search_furniture" onClick={goCategorySearch} className={styles.category_btn}>가구/인테리어</button>
                                </a>
                                <div>
                                    <ul>
                                        <li className={styles.category_d}>
                                            <div className={styles.line}></div>
                                            <form name='search_bed' id='search_bed' method='get'>
                                                <input name='search_bed' id='search_bed' placeholder='  검색'defaultValue="침대" style={{ display: 'none' }}></input>
                                            </form>
                                            <button type="submit" form="search_bed" onClick={goCategorySearch} className={styles.category_btn}>침대</button>
                                        </li>
                                        <li className={styles.category_d}>
                                            <div className={styles.line}></div>
                                            <form name='search_sofa' id='search_sofa' method='get'>
                                                <input name='search_sofa' id='search_sofa' placeholder='  검색'defaultValue="소파" style={{ display: 'none' }}></input>
                                            </form>
                                            <button type="submit" form="search_sofa" onClick={goCategorySearch} className={styles.category_btn}>소파</button>
                                        </li>
                                        <li className={styles.category_d}>
                                            <div className={styles.line}></div>
                                            <form name='search_desk' id='search_desk' method='get'>
                                                <input name='search_desk' id='search_desk' placeholder='  검색'defaultValue="책상" style={{ display: 'none' }}></input>
                                            </form>
                                            <button type="submit" form="search_desk" onClick={goCategorySearch} className={styles.category_btn}>책상</button>
                                        </li>
                                        <li className={styles.category_d}>
                                            <div className={styles.line}></div>
                                            <form name='search_chair' id='search_chair' method='get'>
                                                <input name='search_chair' id='search_chair' placeholder='  검색'defaultValue="의자" style={{ display: 'none' }}></input>
                                            </form>
                                            <button type="submit" form="search_chair" onClick={goCategorySearch} className={styles.category_btn}>의자</button>
                                        </li>
                                        <li className={styles.category_d}>
                                            <div className={styles.line}></div>
                                            <form name='search_furnitureElse' id='search_furnitureElse' method='get'>
                                                <input name='search_furnitureElse' id='search_furnitureElse' placeholder='  검색'defaultValue="가구기타" style={{ display: 'none' }}></input>
                                            </form>
                                            <button type="submit" form="search_furnitureElse" onClick={goCategorySearch} className={styles.category_btn}>가구기타</button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className={styles.category_item}>
                                <a onClick={goCategorySearch} id="가전제품">
                                    <div className={styles.line}></div>
                                    <form name='search_eletronics' id='search_eletronics' method='get'>
                                        <input name='search_eletronics' id='search_eletronics' placeholder='  검색'defaultValue="가전제품" style={{ display: 'none' }}></input>
                                    </form>
                                    <button type="submit" form="search_eletronics" onClick={goCategorySearch} className={styles.category_btn}>가전제품</button>
                                </a>
                                <div>
                                    <ul>
                                        <li className={styles.category_d}>
                                            <div className={styles.line}></div>
                                            <form name='search_refrigerator' id='search_refrigerator' method='get'>
                                                <input name='search_refrigerator' id='search_refrigerator' placeholder='  검색'defaultValue="냉장고" style={{ display: 'none' }}></input>
                                            </form>
                                            <button type="submit" form="search_refrigerator" onClick={goCategorySearch} className={styles.category_btn}>냉장고</button>
                                        </li>
                                        <li className={styles.category_d}>
                                            <div className={styles.line}></div>
                                            <form name='search_TV' id='search_TV' method='get'>
                                                <input name='search_TV' id='search_TV' placeholder='  검색'defaultValue="TV" style={{ display: 'none' }}></input>
                                            </form>
                                            <button type="submit" form="search_TV" onClick={goCategorySearch} className={styles.category_btn}>TV</button>
                                        </li>
                                        <li className={styles.category_d}>
                                            <div className={styles.line}></div>
                                            <form name='search_vacuum' id='search_vacuum' method='get'>
                                                <input name='search_vacuum' id='search_vacuum' placeholder='  검색'defaultValue="청소기" style={{ display: 'none' }}></input>
                                            </form>
                                            <button type="submit" form="search_vacuum" onClick={goCategorySearch} className={styles.category_btn}>청소기</button>
                                        </li>
                                        <li className={styles.category_d}>
                                            <div className={styles.line}></div>
                                            <form name='search_aircon' id='search_aircon' method='get'>
                                                <input name='search_aircon' id='search_aircon' placeholder='  검색'defaultValue="에어컨" style={{ display: 'none' }}></input>
                                            </form>
                                            <button type="submit" form="search_aircon" onClick={goCategorySearch} className={styles.category_btn}>에어컨</button>
                                        </li>
                                        <li className={styles.category_d}>
                                            <div className={styles.line}></div>
                                            <form name='search_eletronicsElse' id='search_eletronicsElse' method='get'>
                                                <input name='search_eletronicsElse' id='search_eletronicsElse' placeholder='  검색'defaultValue="가전제품기타" style={{ display: 'none' }}></input>
                                            </form>
                                            <button type="submit" form="search_eletronicsElse" onClick={goCategorySearch} className={styles.category_btn}>가전제품기타</button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className={styles.category_item}>
                                <a onClick={goCategorySearch} id="모바일_태블릿_PC">
                                    <div className={styles.line}></div>
                                    <form name='search_mobile' id='search_mobile' method='get'>
                                        <input name='search_mobile' id='search_mobile' placeholder='  검색'defaultValue="모바일_태블릿_PC" style={{ display: 'none' }}></input>
                                    </form>
                                    <button type="submit" form="search_mobile" onClick={goCategorySearch} className={styles.category_btn}>모바일/태블릿/PC</button>
                                </a>
                                <div>
                                    <ul>
                                        <li className={styles.category_d}>
                                            <div className={styles.line}></div>
                                            <form name='search_smartPhone' id='search_smartPhone' method='get'>
                                                <input name='search_smartPhone' id='search_smartPhone' placeholder='  검색'defaultValue="스마트폰" style={{ display: 'none' }}></input>
                                            </form>
                                            <button type="submit" form="search_smartPhone" onClick={goCategorySearch} className={styles.category_btn}>스마트폰</button>
                                        </li>
                                        <li className={styles.category_d}>
                                            <div className={styles.line}></div>
                                            <form name='search_tablet' id='search_tablet' method='get'>
                                                <input name='search_tablet' id='search_tablet' placeholder='  검색'defaultValue="태블릿" style={{ display: 'none' }}></input>
                                            </form>
                                            <button type="submit" form="search_tablet" onClick={goCategorySearch} className={styles.category_btn}>태블릿</button>
                                        </li>
                                        <li className={styles.category_d}>
                                            <div className={styles.line}></div>
                                            <form name='search_laptop' id='search_laptop' method='get'>
                                                <input name='search_laptop' id='search_laptop' placeholder='  검색'defaultValue="노트북" style={{ display: 'none' }}></input>
                                            </form>
                                            <button type="submit" form="search_laptop" onClick={goCategorySearch} className={styles.category_btn}>노트북</button>
                                        </li>
                                        <li className={styles.category_d}>
                                            <div className={styles.line}></div>
                                            <form name='search_mobileElse' id='search_mobileElse' method='get'>
                                                <input name='search_mobileElse' id='search_mobileElse' placeholder='  검색'defaultValue="모바일/태블릿/PC기타" style={{ display: 'none' }}></input>
                                            </form>
                                            <button type="submit" form="search_mobileElse" onClick={goCategorySearch} className={styles.category_btn}>모바일/태블릿/PC 기타</button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className={styles.category_item}>
                                <a onClick={goCategorySearch} id="생활용품">
                                    <div className={styles.line}></div>
                                    <form name='search_life' id='search_life' method='get'>
                                        <input name='search_life' id='search_life' placeholder='  검색'defaultValue="생활용품" style={{ display: 'none' }}></input>
                                    </form>
                                    <button type="submit" form="search_life" onClick={goCategorySearch} className={styles.category_btn}>생활용품</button>
                                </a>
                                <div>
                                    <ul>
                                        <li className={styles.category_d}>
                                            <div className={styles.line}></div>
                                            <form name='search_clean' id='search_clean' method='get'>
                                                <input name='search_clean' id='search_clean' placeholder='  검색'defaultValue="청소" style={{ display: 'none' }}></input>
                                            </form>
                                            <button type="submit" form="search_clean" onClick={goCategorySearch} className={styles.side_category_btn}>청소</button>
                                        </li>
                                        <li className={styles.category_d}>
                                            <div className={styles.line}></div>
                                            <form name='search_kitchen' id='search_kitchen' method='get'>
                                                <input name='search_kitchen' id='search_kitchen' placeholder='  검색'defaultValue="주방" style={{ display: 'none' }}></input>
                                            </form>
                                            <button type="submit" form="search_kitchen" onClick={goCategorySearch} className={styles.side_category_btn}>주방</button>
                                        </li>
                                        <li className={styles.category_d}>
                                            <div className={styles.line}></div>
                                            <form name='search_bath' id='search_bath' method='get'>
                                                <input name='search_bath' id='search_bath' placeholder='  검색'defaultValue="욕실" style={{ display: 'none' }}></input>
                                            </form>
                                            <button type="submit" form="search_bath" onClick={goCategorySearch} className={styles.side_category_btn}>욕실</button>
                                        </li>
                                        <li className={styles.category_d}>
                                            <div className={styles.line}></div>
                                            <form name='search_lifeElse' id='search_lifeElse' method='get'>
                                                <input name='search_lifeElse' id='search_lifeElse' placeholder='  검색'defaultValue="생활용품기타" style={{ display: 'none' }}></input>
                                            </form>
                                            <button type="submit" form="search_lifeElse" onClick={goCategorySearch} className={styles.side_category_btn}>생활용품기타</button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className={styles.category_item}>
                                <a onClick={goCategorySearch} id="반려동물">
                                    <div className={styles.line}></div>
                                    <form name='search_animal' id='search_animal' method='get'>
                                        <input name='search_animal' id='search_animal' placeholder='  검색'defaultValue="반려동물" style={{ display: 'none' }}></input>
                                    </form>
                                    <button type="submit" form="search_animal" onClick={goCategorySearch} className={styles.category_btn}>반려동물</button>
                                </a>
                                <div>
                                    <ul>
                                        <li className={styles.category_d}>
                                            <div className={styles.line}></div>
                                            <form name='search_feed' id='search_feed' method='get'>
                                                <input name='search_feed' id='search_feed' placeholder='  검색'defaultValue="사료" style={{ display: 'none' }}></input>
                                            </form>
                                            <button type="submit" form="search_feed" onClick={goCategorySearch} className={styles.category_btn}>사료</button>
                                        </li>
                                        <li className={styles.category_d}>
                                            <div className={styles.line}></div>
                                            <form name='search_toy' id='search_toy' method='get'>
                                                <input name='search_toy' id='search_toy' placeholder='  검색'defaultValue="Toy" style={{ display: 'none' }}></input>
                                            </form>
                                            <button type="submit" form="search_toy" onClick={goCategorySearch} className={styles.category_btn}>Toy</button>
                                        </li>
                                        <li className={styles.category_d}>
                                            <div className={styles.line}></div>
                                            <form name='search_dogClothes' id='search_dogClothes' method='get'>
                                                <input name='search_dogClothes' id='search_dogClothes' placeholder='  검색'defaultValue="반려동물의류" style={{ display: 'none' }}></input>
                                            </form>
                                            <button type="submit" form="search_dogClothes" onClick={goCategorySearch} className={styles.category_btn}>반려동물의류</button>
                                        </li>
                                        <li className={styles.category_d}>
                                            <div className={styles.line}></div>
                                            <form name='search_animalElse' id='search_animalElse' method='get'>
                                                <input name='search_animalElse' id='search_animalElse' placeholder='  검색'defaultValue="반려동물기타" style={{ display: 'none' }}></input>
                                            </form>
                                            <button type="submit" form="search_animalElse" onClick={goCategorySearch} className={styles.category_btn}>반려동물기타</button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className={styles.category_item}>
                                <a onClick={goCategorySearch} id="문구_도서">
                                    <div className={styles.line}></div>
                                    <form name='search_stationery' id='search_stationery' method='get'>
                                        <input name='search_stationery' id='search_stationery' placeholder='  검색'defaultValue="문구/도서" style={{ display: 'none' }}></input>
                                    </form>
                                    <button type="submit" form="search_stationery" onClick={goCategorySearch} className={styles.category_btn}>문구/도서</button>
                                </a>
                                <div>
                                    <ul>
                                        <li className={styles.category_d}>
                                            <div className={styles.line}></div>
                                            <form name='search_book' id='search_book' method='get'>
                                                <input name='search_book' id='search_book' placeholder='  검색'defaultValue="책" style={{ display: 'none' }}></input>
                                            </form>
                                            <button type="submit" form="search_book" onClick={goCategorySearch} className={styles.category_btn}>책</button>
                                        </li>
                                        <li className={styles.category_d}>
                                            <div className={styles.line}></div>
                                            <form name='search_pen' id='search_pen' method='get'>
                                                <input name='search_pen' id='search_pen' placeholder='  검색'defaultValue="볼펜" style={{ display: 'none' }}></input>
                                            </form>
                                            <button type="submit" form="search_pen" onClick={goCategorySearch} className={styles.category_btn}>볼펜</button>
                                        </li>
                                        <li className={styles.category_d}>
                                            <div className={styles.line}></div>
                                            <form name='search_sharpPen' id='search_sharpPen' method='get'>
                                                <input name='search_sharpPen' id='search_sharpPen' placeholder='  검색'defaultValue="샤프/연필" style={{ display: 'none' }}></input>
                                            </form>
                                            <button type="submit" form="search_sharpPen" onClick={goCategorySearch} className={styles.category_btn}>샤프/연필</button>
                                        </li>
                                        <li className={styles.category_d}>
                                            <div className={styles.line}></div>
                                            <form name='search_stationeryElse' id='search_stationeryElse' method='get'>
                                                <input name='search_stationeryElse' id='search_stationeryElse' placeholder='  검색'defaultValue="문구/도서기타" style={{ display: 'none' }}></input>
                                            </form>
                                            <button type="submit" form="search_stationeryElse" onClick={goCategorySearch} className={styles.category_btn}>문구/도서 기타</button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className={styles.category_item}>
                                <a onClick={goCategorySearch} id="스포츠">
                                    <div className={styles.line}></div>
                                    <form name='search_sports' id='search_sports' method='get'>
                                        <input name='search_sports' id='search_input' placeholder='  검색'defaultValue="스포츠" style={{ display: 'none' }}></input>
                                    </form>
                                    <button type="submit" form="search_sports" onClick={goCategorySearch} className={styles.category_btn}>스포츠</button>
                                </a>
                                <div>
                                    <ul>
                                        <li className={styles.category_d}>
                                            <div className={styles.line}></div>
                                            <form name='search_soccer' id='search_soccer' method='get'>
                                                <input name='search_soccer' id='search_soccer' placeholder='  검색'defaultValue="축구" style={{ display: 'none' }}></input>
                                            </form>
                                            <button type="submit" form="search_soccer" onClick={goCategorySearch} className={styles.category_btn}>축구</button>
                                        </li>
                                        <li className={styles.category_d}>
                                            <div className={styles.line}></div>
                                            <form name='search_baseball' id='search_baseball' method='get'>
                                                <input name='search_baseball' id='search_baseball' placeholder='  검색'defaultValue="야구" style={{ display: 'none' }}></input>
                                            </form>
                                            <button type="submit" form="search_baseball" onClick={goCategorySearch} className={styles.category_btn}>야구</button>
                                        </li>
                                        <li className={styles.category_d}>
                                            <div className={styles.line}></div>
                                            <form name='search_basketball' id='search_basketball' method='get'>
                                                <input name='search_basketball' id='search_basketball' placeholder='  검색'defaultValue="농구" style={{ display: 'none' }}></input>
                                            </form>
                                            <button type="submit" form="search_basketball" onClick={goCategorySearch} className={styles.category_btn}>농구</button>
                                        </li>
                                        <li className={styles.category_d}>
                                            <div className={styles.line}></div>
                                            <form name='search_weight' id='search_weight' method='get'>
                                                <input name='search_weight' id='search_weight' placeholder='  검색'defaultValue="헬스" style={{ display: 'none' }}></input>
                                            </form>
                                            <button type="submit" form="search_weight" onClick={goCategorySearch} className={styles.category_btn}>헬스</button>
                                        </li>
                                        <li className={styles.category_d}>
                                            <div className={styles.line}></div>
                                            <form name='search_sportsElse' id='search_sportsElse' method='get'>
                                                <input name='search_sportsElse' id='search_sportsElse' placeholder='  검색'defaultValue="스포츠기타" style={{ display: 'none' }}></input>
                                            </form>
                                            <button type="submit" form="search_sportsElse" onClick={goCategorySearch} className={styles.category_btn}>스포츠기타</button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className={styles.category_item}>
                                <a onClick={goCategorySearch} id="자동차용품">
                                    <div className={styles.line}></div>
                                    <form name='search_car' id='search_car' method='get'>
                                        <input name='search_car' id='search_input' placeholder='  검색'defaultValue="자동차용품" style={{ display: 'none' }}></input>
                                    </form>
                                    <button type="submit" form="search_car" onClick={goCategorySearch} className={styles.category_btn}>자동차용품</button>
                                </a>
                                <div>
                                    <ul>
                                        <li className={styles.category_d}>
                                            <div className={styles.line}></div>
                                            <form name='search_freshener' id='search_freshener' method='get'>
                                                <input name='search_freshener' id='search_freshener' placeholder='  검색'defaultValue="방향제" style={{ display: 'none' }}></input>
                                            </form>
                                            <button type="submit" form="search_freshener" onClick={goCategorySearch} className={styles.category_btn}>방향제</button>
                                        </li>
                                        <li className={styles.category_d}>
                                            <div className={styles.line}></div>
                                            <form name='search_accessory' id='search_accessory' method='get'>
                                                <input name='search_accessory' id='search_accessory' placeholder='  검색'defaultValue="악세사리" style={{ display: 'none' }}></input>
                                            </form>
                                            <button type="submit" form="search_accessory" onClick={goCategorySearch} className={styles.category_btn}>악세사리</button>
                                        </li>
                                        <li className={styles.category_d}>
                                            <div className={styles.line}></div>
                                            <form name='search_blackbox' id='search_blackbox' method='get'>
                                                <input name='search_blackbox' id='search_blackbox' placeholder='  검색'defaultValue="블랙박스" style={{ display: 'none' }}></input>
                                            </form>
                                            <button type="submit" form="search_blackbox" onClick={goCategorySearch} className={styles.category_btn}>블랙박스</button>
                                        </li>
                                        <li className={styles.category_d}>
                                            <div className={styles.line}></div>
                                            <form name='search_carElse' id='search_carElse' method='get'>
                                                <input name='search_carElse' id='search_carElse' placeholder='  검색'defaultValue="자동차용품기타" style={{ display: 'none' }}></input>
                                            </form>
                                            <button type="submit" form="search_carElse" onClick={goCategorySearch} className={styles.category_btn}>자동차용품 기타</button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className={styles.category_item}>
                                <a onClick={goCategorySearch} id="식품">
                                    <div className={styles.line}></div>
                                    <form name='search_food' id='search_food' method='get'>
                                        <input name='search_food' id='search_input' placeholder='  검색' defaultValue="식품" style={{ display: 'none' }}></input>
                                    </form>
                                    <button type="submit" form="search_food" onClick={goCategorySearch} className={styles.category_btn}>식품</button>
                                </a>
                                <div>
                                    <ul>
                                        <li className={styles.category_d}>
                                            <div className={styles.line}></div>
                                            <form name='search_water' id='search_water' method='get'>
                                                <input name='search_water' id='search_water' placeholder='  검색'defaultValue="생수" style={{ display: 'none' }}></input>
                                            </form>
                                            <button type="submit" form="search_water" onClick={goCategorySearch} className={styles.category_btn}>생수</button>
                                        </li>
                                        <li className={styles.category_d}>
                                            <div className={styles.line}></div>
                                            <form name='search_noodle' id='search_noodle' method='get'>
                                                <input name='search_noodle' id='search_noodle' placeholder='  검색'defaultValue="라면" style={{ display: 'none' }}></input>
                                            </form>
                                            <button type="submit" form="search_noodle" onClick={goCategorySearch} className={styles.category_btn}>라면</button>
                                        </li>
                                        <li className={styles.category_d}>
                                            <div className={styles.line}></div>
                                            <form name='search_snack' id='search_snack' method='get'>
                                                <input name='search_snack' id='search_snack' placeholder='  검색'defaultValue="과자" style={{ display: 'none' }}></input>
                                            </form>
                                            <button type="submit" form="search_snack" onClick={goCategorySearch} className={styles.category_btn}>과자</button>
                                        </li>
                                        <li className={styles.category_d}>
                                            <div className={styles.line}></div>
                                            <form name='search_bread' id='search_bread' method='get'>
                                                <input name='search_bread' id='search_bread' placeholder='  검색'defaultValue="빵" style={{ display: 'none' }}></input>
                                            </form>
                                            <button type="submit" form="search_bread" onClick={goCategorySearch} className={styles.category_btn}>빵</button>
                                        </li>
                                        <li className={styles.category_d}>
                                            <div className={styles.line}></div>
                                            <form name='search_foodElse' id='search_foodElse' method='get'>
                                                <input name='search_foodElse' id='search_foodElse' placeholder='  검색'defaultValue="식품기타" style={{ display: 'none' }}></input>
                                            </form>
                                            <button type="submit" form="search_foodElse" onClick={goCategorySearch} className={styles.category_btn}>식품기타</button>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <a onClick={goCategorySearch} id="기타">
                                <div className={styles.line}></div>
                                <form name='search_etc' id='search_etc' method='get'>
                                    <input name='search_etc' id='search_input' placeholder='  검색'  defaultValue="기타" style={{ display: 'none' }}></input>
                                </form>
                                <button type="submit" form="search_etc" onClick={goCategorySearch} className={styles.category_btn}>기타</button>
                            </a>
                            <div className={styles.bottom_line}></div>
                        </div>
                    </div>
                    <Link to={"/pages/Chat"} className={styles.tlist_item_a} target={`_top`}>
                        <li className={styles.tlist_item} >
                            <a className={styles.tlist_item_a}>
                                <span className={styles.tlist_text}>채팅</span>
                            </a>
                        </li>
                    </Link>

                    {/*<li className={styles.tlist_item}>*/}
                    {/*    <a className={styles.tlist_item_a}>*/}
                    {/*        <span className={styles.tlist_text}>채팅</span>*/}
                    {/*    </a>*/}
                    {/*</li>*/}
                    <li className={styles.tlist_item}>
                        <a className={styles.tlist_item_a}>
                            <form name='search' id='search_form' method='get'>
                                <input type='text' minLength="1" id='search_input' className={`${styles.tlist_text} ${styles.search_input}`}
                                       placeholder='  검색' name='search' onChange={handleInputChange} required></input>
                            </form>
                        </a>
                        <button type='submit' form='search_form' id='search_btn'
                                className={`${styles.tlist_text} ${styles.search_input_btn}`} onClick={goSearchResult}></button>
                        {/*disabled={inputText.length < 2}*/}
                        <Searchbar></Searchbar>
                    </li>
                </ul>
            </nav>
            <nav className={styles.right_nav}>
                <ul className={styles.top_list}>
                    <li className={styles.tlist_item} onClick={goNotice}>
                        <a className={styles.tlist_item_a}>
                            <span className={styles.tlist_text}>판매등록</span>
                        </a>
                    </li>
                    <li className={styles.tlist_item} onClick={document.cookie.match('isLogin' + '=([^;]*)(;|$)') ? logout:goLogin}>
                        <a className={styles.tlist_item_a}>
                            <span className={styles.tlist_text}>{(document.cookie.match('isLogin' + '=([^;]*)(;|$)')? 'LogOut' : 'LogIn')}</span>
                        </a>
                    </li>
                    <li className={styles.tlist_item} onClick={goMypage}>
                        <a className={styles.tlist_item_a} href="#">
                            <span className={styles.tlist_text}>마이페이지</span>
                        </a>
                    </li>
                </ul>
            </nav>
            <Sidebar></Sidebar>
        </div>
    );
}

export default TopNav;