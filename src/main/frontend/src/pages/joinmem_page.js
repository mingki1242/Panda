import Mem from './mem';
import styles from '../Css_dir/login_mem.module.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function MemPage() {
    const movePage = useNavigate();

    function goLogin(){
        movePage('/pages/loginPage');
    }
    return (
        <div className={styles.App}>
            <div className={styles.login_page}>
                <div className={styles.login_wrap}>
                    <div className={styles.login_box}>
                        <h1>Join Membership</h1>
                        <div className={styles.login_input_form}>
                            <Mem />
                            <div className={styles.login_btn_wrap}>
                                <button type="button" className={styles.cancel_btn_under}>취소</button>
                                <button type="button" className={styles.cancel_btn} onClick={goLogin}><span>취소</span></button>
                            </div>
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

export default MemPage;
