import React, {useEffect, useState} from "react";
import styles from '../Css_dir/login_mem.module.css';
import {useNavigate} from "react-router-dom";
import axios from "axios";

const email_regex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
const pw_regex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
function Login() {
    let [email, setEmail] = useState('');
    let [pw, setPw] = useState('');
    const changeEmail = (e) =>{
        const value = e.target.value;
        setEmail(value);
    }
    const changePw = (e) => {
        const value = e.target.value; // 우선 e.target 에서 name 과 value 를 추출
        setPw(value);
    };
    const email_error = '***올바른 이메일 형식이 아닙니다.***';
    const pw_error = '***비밀번호는 영어, 숫자 포함 8자리 이상이어야 합니다.***';
    const movePage = useNavigate();
    function goHome(){
        movePage('/');
        window.location.reload();
    }
    const login = (e) => {
        e.preventDefault();
        if (!email_regex.test(email)) {
            alert('정확한 이메일을 입력해 주세요.');
            return false;
        }
        if (email === '') {
            alert('이메일을 입력해 주세요.');
            return false;
        }
        if (!pw_regex.test(pw)) {
            alert('알파벳과 숫자가 포함된 8자리 이상 25자리 이하 비밀번호를 입력해 주세요.');
            return false;
        }
        if (pw === '') {
            alert('비밀번호를 입력해 주세요.');
            return false;
        }
        let formData = new FormData();
        formData.append("email", email);
        formData.append("password", pw);
        axios.post('/login', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                // "Access-Control-Allow-Origin": `http://localhost:8000`,
                // 'Access-Control-Allow-Credentials':"true",
            },
        })
            .then((response) => {
                if (response.status === 200) {
                    console.log('로그인 성공');
                    //alert('로그인');
                    document.cookie="isLogin=true; path=/;"
                    goHome();
                } else {
                    console.log('로그인 실패');
                    console.log(response.data);
                    document.cookie="isLogin=false; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;"
                    sessionStorage.clear();
                }
            })
            .catch(error => {
                console.error(error);
                console.log('로그인 실패');
                document.cookie="isLogin=false; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;"
                sessionStorage.clear();
                alert('로그인 실패\n이메일과 비밀번호를 확인해 주세요.');
            });
    }
    const handleOnKeyPress = e => {
        if (e.key === 'Enter') {
            login(e); // Enter 입력이 되면 클릭 이벤트 실행
        }
    };
    return (
        <>
        <div>
            <form name='login_form' id='login_form' method='post'>
                <input type='text' className={styles.input} placeholder='E-mail' name='email' onChange={changeEmail} value={email} onKeyDown={handleOnKeyPress}></input>
                {!email_regex.test(email) && email !== '' ? <div className={styles.error_message}>{email_error}</div>:<div className={styles.error_message}></div>}
                <input type='password' className={styles.input} placeholder='Password : 영어, 숫자 포함 8자리 이상' name='password' onChange={changePw} value={pw} onKeyDown={handleOnKeyPress}></input>
                {!pw_regex.test(pw) && pw !== '' ? <div className={styles.error_message}>{pw_error}</div>:<div className={styles.error_message}></div>}
                <div className={styles.login_btn_wrap}>
                    <button className={styles.login_btn_under}>LogIn</button>
                    <button className={styles.login_btn} onClick={login}><span>LogIn</span></button>
                </div>
            </form>
        </div>
        </>
    )
}

export default Login;