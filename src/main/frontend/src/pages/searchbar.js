import React, {useEffect, useRef, useState } from "react";
import styles from "../Css_dir/searchbar.module.css";
import {useNavigate} from "react-router-dom";

const Searchbar = () => {
    const [isOpenTop, setIsOpenTop] = useState(false);
    const [inputText, setInputText] = useState('');
    const outClickRef = useRef(null);
    const movePage = useNavigate();

    const toggleMenu = () => {
        setIsOpenTop(!isOpenTop);
    };

    const handleInputChange=(e)=>{
        setInputText(e.target.value);
    }
    function goSearchResult(){   //입력해서 검색
        const query='input[id=search_input]';
        const searchElement=document.querySelector(query);
        const search_word=searchElement.value;

        const singleConsonantRegex = /[ㄱ-ㅎ | ㅏ-ㅣ]{1}$/;

        if(inputText.length >=1 && singleConsonantRegex.test(inputText)==false){
            const searchdata=new FormData();
            searchdata.append('word', search_word);
            movePage('/pages/SearchResult?search='+search_word, {state:{word:search_word}});
        }else{
            alert('자음, 모음 1글자 입력은 안됩니다!');
        }
    }

    useEffect(()=> {
        function handleClose(e){
            if (isOpenTop === true && (outClickRef.current && !outClickRef.current.contains(e.target))) {
                console.log("out click, close searchbar");
                setIsOpenTop(false);
            }
        }
        window.addEventListener('mousedown', handleClose);
        return () => {
            window.removeEventListener('mousedown', handleClose);
        };
    }, [isOpenTop]);

    return (
        <div className={styles.header} ref={outClickRef}>
            <div className={styles.logo_box}>
                <button className={styles.logo} width='35px'></button>
                <button className={(!isOpenTop ? `${styles.logo}` : `${styles.exit}`)} width='35px' onClick={toggleMenu}></button>
            </div>
            <div className={(isOpenTop ? `${styles.show_menu}` : `${styles.hide_menu}`)}>
                <div className={styles.search_box}>
                    <form name='search' id='search_form_h' method='get'>
                        <input type='text' minLength='1' className={styles.search_input} placeholder='  검색' name='search' onChange={handleInputChange} required></input>
                    </form>
                    <div className={styles.search_btn_wrap}>
                        <button type='submit' form='search_form_h' className={styles.search_input_btn} onClick={goSearchResult}></button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Searchbar;