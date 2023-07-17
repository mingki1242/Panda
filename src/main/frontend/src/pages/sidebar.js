import React, {useEffect, useRef, useState } from "react";
import styles from "../Css_dir/sidebar.module.css";
import {Link, useNavigate} from "react-router-dom";
import DetailedSideCategory from "./SidebarCategory";
import axios from "axios";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isCategory, setIsCategory] = useState(false);
    const [inputText, setInputText] = useState('');
    const sideClickRef = useRef(null);
    // button 클릭 시 토글
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    const toggleCategory = () => {
        setIsCategory(!isCategory);
    }

    //사이드바 외부 클릭시 닫히는 함수
    useEffect(()=> {
        function handleClose(e){
            if (isOpen === true && (sideClickRef.current && !sideClickRef.current.contains(e.target))) {
                setIsOpen(false);
            }
        }
        window.addEventListener('mousedown', handleClose);
        return () => {
            window.removeEventListener('mousedown', handleClose);
        };
    }, [isOpen]);

    const movePage = useNavigate();

    function goChat(){
        toggleMenu();
        movePage('/pages/chat');
    }
    function goSearchResult(){
        toggleMenu();
        const query='input[id=search_side_input]';
        const searchElement=document.querySelector(query);
        const search_word=searchElement.value;
        const singleConsonantRegex = /[ㄱ-ㅎ | ㅏ-ㅣ]{1}$/;

        if(searchElement.value.length >=1 && singleConsonantRegex.test(inputText)==false){
            const searchdata=new FormData();
            searchdata.append('word', search_word);
            movePage('/pages/SearchResult?search='+search_word, {state:{word:search_word}});
        }else{
            alert('자음, 모음 1글자 입력은 안됩니다!');
        }
    }

    function goLogin() {
        toggleMenu();
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
                    toggleMenu();
                    movePage('/pages/noticePage');
                }
                else{
                    console.log('need login');
                    document.cookie = "isLogin=false; path=/; expires=Thu, 01 JAN 1999 00:00:10 GMT";
                    sessionStorage.clear();
                    alert('로그인이 필요합니다.');
                    toggleMenu();
                    movePage('/pages/loginPage');
                }
            }).catch(error=>{
            console.error(error);
            console.log('need login');
            document.cookie = "isLogin=false; path=/; expires=Thu, 01 JAN 1999 00:00:10 GMT";
            sessionStorage.clear();
            alert('로그인이 필요합니다.');
            toggleMenu();
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
                    toggleMenu();
                    movePage('/pages/OtherPage2');
                }
                else{
                    console.log('need login');
                    document.cookie = "isLogin=false; path=/; expires=Thu, 01 JAN 1999 00:00:10 GMT";
                    sessionStorage.clear();
                    alert('로그인이 필요합니다.');
                    toggleMenu();
                    movePage('/pages/loginPage');
                }
            }).catch(error=>{
            console.error(error);
            console.log('need login');
            document.cookie = "isLogin=false; path=/; expires=Thu, 01 JAN 1999 00:00:10 GMT";
            sessionStorage.clear();
            alert('로그인이 필요합니다.');
            toggleMenu();
            movePage('/pages/loginPage');
        });
    }
    const handleInputChange=(e)=>{
        setInputText(e.target.value);
    }
    const link_style = {
        textDecoration: "none",
        color: "white"
    }

    return (
        <div className={styles.header} ref={sideClickRef}>
            <div className={styles.logo_box}>
                <button className={styles.logo} width='35px'></button>
                <button className={(!isOpen ? `${styles.logo}` : `${styles.exit}`)} width='35px' onClick={toggleMenu}></button>
                <div className={styles.line}></div>
            </div>
            <div className={(isOpen ? (isCategory ? `${styles.show_menu_category}` : `${styles.show_menu}`) : `${styles.hide_menu}`)}>
                <div className={styles.search_box}>
                    <form name='search_side' id='search_form_s' method='get'>
                        <input type='text' minLength="1" className={styles.search_input} placeholder='  검색' name='search_side' id='search_side_input' onChange={handleInputChange} required></input>
                    </form>
                    <div className={styles.search_btn_wrap}>
                        <button type='submit' form='search_form_s' className={styles.search_input_btn} onClick={goSearchResult}></button>
                    </div>
                </div>
                <div>
                    <br/><br/>
                    최근 검색 or 추천검색 등
                </div>
                <ul className={styles.nav_list}>
                    <li className={`${styles.nav_list_item}`} onClick={toggleCategory}>{isCategory ? '카테고리 ▲' : '카테고리 ▼'}<div className={styles.list_line}></div></li>
                    <li className={isCategory ? `${styles.category_list}` : `${styles.hide_category_list}`}><DetailedSideCategory/></li>
                    <Link to={"/pages/Chat"} target={`_top`} style={link_style}>
                        <li className={styles.nav_list_item} >
                            채팅
                        </li>
                    </Link>
                    {/*<li className={styles.nav_list_item} onClick={goChat}>채팅<div className={styles.list_line}></div></li>*/}
                    <li className={styles.nav_list_item} onClick={goNotice}>판매등록<div className={styles.list_line}></div></li>
                    <li className={styles.nav_list_item} onClick={document.cookie.match('isLogin' + '=([^;]*)(;|$)') ? logout:goLogin}>
                        {(document.cookie.match('isLogin' + '=([^;]*)(;|$)')? 'LogOut' : 'LogIn')}
                        <div className={styles.list_line}></div>
                    </li>
                    <li className={styles.nav_list_item} onClick={goMypage}>마이페이지<div className={styles.list_line}></div></li>
                    <li className={isCategory ? `${styles.nav_list_item_last_h}` : `${styles.nav_list_item_last}`}></li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;