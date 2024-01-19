import Login from './login';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "../Css_dir/login_mem.module.css";

function LogInPage() {
    const movePage = useNavigate();

    function goMem(){
        movePage('/pages/joinMemPage');
    }
    return (
        <div className={styles.App}>
            <div className={styles.login_page}>
                <div className={styles.login_wrap}>
                    <div className={styles.login_box}>
                        <h1 className={styles.login_head}>LogIn</h1>
                        <div className={styles.login_input_form}>
                            <Login />
                            <div className={styles.login_btn_wrap}>
                                <button type="button" className={styles.mem_btn_under}>회원가입</button>
                                <button type="button" className={styles.mem_btn} onClick={goMem}><span>회원가입</span></button>
                            </div>
                        </div>
                        <div className={styles.login_setting}>
                            <p>
                                <a href=''>아이디 찾기</a>
                                <a href=''>비밀번호 찾기</a>
                            </p>
                        </div>
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

export default LogInPage;
