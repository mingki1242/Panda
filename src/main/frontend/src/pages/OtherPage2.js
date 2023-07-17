import '../App.css';
import React, {useEffect, useRef, useState} from 'react';
import FixBar from "./FixBar";
import axios from 'axios';
import styles from "../Css_dir/SearchResult.module.css";
import inputStyles from "../Css_dir/login_mem.module.css";
import profile from "../imgs/logo512_512.png";
import Modal from "react-modal";

const pw_regex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
const phone_regex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;

function OtherPage() {
    const [userInfo, setUserInfo] = useState([])
    const [previewImage, setPreviewImage] = useState(null); // 프로필사진 저장
    const [isPwOpen, setPwOpen] = useState(false);
    let [pw, setPw] = useState('');
    let [pw_ch, setPw_check] = useState('');
    let [newPw, setNewPw] = useState('');
    let [nickname, setNickname] = useState('');
    let [phone, setPhone] = useState('');
    let [addr, setAddr] = useState('');
    const [fileInputKey, setFileInputKey] = useState(Date.now());
    const imageInput = useRef();

    const pw_error = '***비밀번호는 영어, 숫자 포함 8자리 이상이어야 합니다.***';
    const pwch_error = '** 새 비밀번호와 비밀번호 확인이 일치하지 않습니다. **';
    const phone_error = '***정확한 전화번호를 입력해 주십시오.***';

    const handleFileChange = (event) => {
        if(event.target.files[0] == null) {
            return;
        }

        const file = event.target.files[0];

        const fileExtension = file.name.split('.').pop().toLowerCase();
        const allowedExtensions = ['jpg', 'jpeg', 'png'];

        if (!allowedExtensions.includes(fileExtension)) {
            alert('지원하는 이미지 파일이 아닙니다.');
            return;
        }

        if(file) {
            const reader = new FileReader();
            reader.onload = () => {
                const imageUrl = reader.result;
                setPreviewImage(imageUrl);
            };
            reader.readAsDataURL(file);
        }
    }

    const baseProfileImage = () => {
        setPreviewImage(profile);
        setFileInputKey(Date.now());
    }

    const openPw = () => {
        setPwOpen(true);
    }

    const closeOpenPw = () => {
        setPwOpen(false);
    }

    const modifyInfo = () => {
        if(addr === '') {
            alert('주소를 입력해 주세요.');
            return;
        }

        if(phone === '') {
            alert('전화번호를 입력해 주세요.');
            return;
        }

        if(nickname === '') {
            alert('닉네임을 입력해 주세요');
            return;
        }

        if(!phone_regex.test(phone)) {
            alert('정확한 전화번호를 입력해 주세요');
            return;
        }

        const user = {
            email: userInfo.email,
            nickname: nickname,
            phoneNumber: phone,
            address: addr,
            userImg: btoa(previewImage)
        }

        axios.post('/account/user', user, {
            headers: {
                "Content-Type": `application/json`,
                "Access-Control-Allow-Origin": `http://localhost:8000`,
                'Access-Control-Allow_Credentials':"true",
            },
        })
            .then((response) => {
                if(response.status === 200) {
                    alert('회원정보 변경 성공');
                    window.location.reload();
                } else {
                    alert('요청이 이상함');
                }
            })
            .catch(error => {
                alert('알 수 없는 오류?');
            });

    }
    const changePw = (e) => {
        const value = e.target.value; // 우선 e.target 에서 value 를 추출
        setPw(value);
    };

    const changeNewPw = (e) => {
        const value = e.target.value; // 우선 e.target 에서 value 를 추출
        setNewPw(value);
    };

    const changePw_check = (e) => {
        const value = e.target.value; // 우선 e.target 에서 value 를 추출
        setPw_check(value);
    };

    const changeNickname = (e) => {
        const value = e.target.value; // 우선 e.target 에서 value 를 추출
        setNickname(value);
    };

    const changePhone = (e) => {
        const value = e.target.value;
        const num = value.replace(/[^0-9]/g, '');
        if(num.length < 11){
            setPhone(value.replace(/[^0-9]/g, '').replace(/^(\d{0,3})(\d{0,3})(\d{0,4})$/g, "$1-$2-$3").replace(/(\-{1,2})$/g, ""));
        }
        else {
            setPhone(value.replace(/[^0-9]/g, '').replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/(\-{1,2})$/g, ""));
        }
    }
    const changeAddr = (e) => {
        const value = e.target.value; // 우선 e.target 에서 value 를 추출
        setAddr(value);
    };

    const imageSelectClick = () => {
        imageInput.current.click();
    };

    const confirmPwChange = () => {

        if(pw === '' || newPw === '' || pw_ch === '') {
            alert('빈 항목을 입력해주세요');
            return;
        }

        if(newPw !== pw_ch) {
            alert('비밀번호 확인이랑 다릅니다.');
            return;
        }

        if(!pw_regex.test(newPw)) {
            alert('알파벳과 숫자가 포함된 8자리 이상 25자리 이하 비밀번호를 입력해 주세요');
            return;
        }

        const user = {
            'email' : userInfo.email,
            'exPassword' : pw,
            'newPassword' : newPw
        };

        axios.post('/account/password', user, {
            headers: {
                "Content-Type": `application/json`,
                "Access-Control-Allow-Origin": `http://localhost:3000`,
                'Access-Control-Allow_Credentials':"true",
            },
        })
            .then((response) => {
                if(response.status === 200) {
                    alert('비밀번호 변경 성공');
                } else {
                    alert('현재 비밀번호가 일치하지 않습니다.');
                }
            })
            .catch(error => {
                alert('현재 비밀번호가 일치하지 않습니다.');
            });
    }

    useEffect(() => {
        axios.get('/account/me')
            .then(response => {
                setUserInfo(response.data);
                setPhone(response.data.phoneNumber);
                setAddr(response.data.address);
                setNickname(response.data.nickname);
                if(response.data.userImg != null)
                    setPreviewImage(`${atob(response.data.userImg)}`);
            })
            .catch(error => console.log(error))
    }, []);

    return (
        <div className={styles.wraper}>
            <FixBar></FixBar>
            <Modal
                isOpen={isPwOpen}
                onRequestClose={closeOpenPw}
                ariaHideApp={false}
                style={{
                    content: {
                        width: '700px',
                        margin: '0 auto',
                        marginTop:'50px',
                        height: '380px',
                        backgroundColor: 'whitesmoke',
                    },
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    },
                }}>
                <div>
                    <div className={styles.modal_title}>
                        비밀번호 변경
                    </div>
                    <div className={styles.form_item}>
                        <label className={styles.form_label}>현재 비밀번호</label>
                        <input type='password' className={inputStyles.input} onChange={changePw}></input> <br/>
                    </div>

                    <div className={styles.form_item}>
                        <label className={styles.form_label}>새 비밀번호</label>
                        <input type='password' className={inputStyles.input} onChange={changeNewPw}></input> <br />
                    </div>

                    <div className={styles.form_item}>
                        <label className={styles.form_label}>비밀번호 확인</label>
                        <input type='password' className={inputStyles.input} onChange={changePw_check}></input> <br />
                    </div>

                    {newPw !== pw_ch ? <div className={inputStyles.error_message}>{pwch_error}</div>:<div className={inputStyles.error_message}></div>}

                    <button className={styles.form_button} onClick={confirmPwChange}>변경</button>
                    <button className={styles.form_button} onClick={closeOpenPw}>취소</button>
                </div>
            </Modal>
            <div className={inputStyles.login_page}>
                <br/>
                <div className={styles.headTitle}>
                    <h1 className={styles.title}>회원 정보
                        <span>사용자의 회원 정보입니다.</span>
                    </h1>
                </div>

                <div className={inputStyles.login_wrap}>
                    <div id='root'>
                        <div className={styles.form_profile}>
                            <label className={styles.form_label}>프로필 사진</label>
                            <img src={previewImage == null ? profile : previewImage} className={styles.form_profile_img}/>
                            <div className={styles.selectImg}>
                                <div className={styles.img_button} onClick={baseProfileImage}>기본 이미지</div>
                                <div className={styles.img_button} onClick={imageSelectClick}>이미지 선택</div>
                                <input type="file" ref={imageInput} onChange={handleFileChange} key={fileInputKey} hidden={true} />
                            </div>
                        </div>
                        <div className={styles.form_item}>
                            <label className={styles.form_label}>이메일</label>
                            <input type='text' className={inputStyles.input} value={userInfo.email}></input>
                        </div>

                        <div className={styles.form_item}>
                            <label className={styles.form_label}>비밀번호</label>
                            <input type='password' className={inputStyles.input} value={"00000000"}></input> <br/>
                            <button className={styles.change_pw} onClick={openPw}>변경</button>
                        </div>

                        <div className={styles.form_item}>
                            <label className={styles.form_label}>닉네임</label>
                            <input type='text' className={inputStyles.input} value={nickname} onChange={changeNickname}></input> <br/>
                        </div>

                        <div className={styles.form_item}>
                            <label className={styles.form_label}>전화번호</label>
                            <input type='text' className={inputStyles.input} value={phone} onChange={changePhone}></input> <br/>
                        </div>

                        <div className={styles.form_item}>
                            <label className={styles.form_label}>주소</label>
                            <input type='text' className={inputStyles.input} value={addr} onChange={changeAddr}></input> <br/>
                        </div>
                        {nickname === '' ? <div className={inputStyles.error_message}>{pwch_error}</div>:<div className={inputStyles.error_message}></div>}
                        <button className={styles.form_button} onClick={modifyInfo}>수정하기</button>
                    </div>
                </div>
                <br/>
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

export default OtherPage;