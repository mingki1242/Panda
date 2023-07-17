import '../App.css';
import '../Css_dir/fixbar.module.css';
import styles from '../Css_dir/SearchResult.module.css'
import React, {useEffect, useState} from 'react';
import CommonTable from '../Tables/CommonTable';
import CommonTableColumn from '../Tables/CommonTableColumn';
import CommonTableRow from '../Tables/CommonTableRow';
import FixBar from "./FixBar";

import {Routes,Route,Link,NavLink,useNavigate} from 'react-router-dom';
import axios from 'axios';
import profile from "../imgs/logo512_512.png";
import dayjs from "dayjs";
import 'dayjs/locale/ko';
dayjs.locale('ko');

function Inquiry_list() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    const movePage= (event)=>{
        const getId=event.currentTarget.id
        navigate('/pages/noticeConfirm?search='+getId, {state:{
                word:getId
            }});
        //document.location.href="/pages/OtherPage";
    }


    const dividePriceUnit=(price)=>{
        return price.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");   //금액 1000단위 끊기
    }


    useEffect(() => {    //사용자 조회 글 찾아옴
        axios.get('/api/inquiryList')
            .then(response => setData(response.data))
            .catch(error => console.log(error))
    }, []);

    return (
        <div className={styles.wraper}>
            <div className={styles.wrapBox}>
                <FixBar></FixBar>
                <br/>
                <div id='root'>
                    <br/>
                    <div className={styles.headTitle}>
                        <h1 className={styles.title}>과거 조회 이력
                            <span>사용자가 찾아봤던 상품 목록입니다..</span>
                        </h1>
                    </div>
                    <br/><br/>
                    <br/><br/>
                    {data.length === 0 ? (
                        <p style={{ fontSize: '25px' }}>검색된 조회 목록이 없습니다..!</p>
                    ):(
                        <CommonTable headersName={['사진', '상품명', '가격', '상품등록일']}>
                            {data.map(item=>(
                                <CommonTableRow>
                                    {/*<td className={styles.common_check_box}><input type="checkbox"  style={{left:"5%"}} name="likeList" value={item.price}/>{item.writing_Id}</td>*/}
                                    <td className={styles.common_check_box} onClick={movePage} id={item.writing_Id}><img width={150} height={150} src={item.writingImg !=null ? `${atob(item.writingImg)}`:profile} alt=""/></td>
                                    <td className={styles.common_check_box} onClick={movePage} id={item.writing_Id}>{item.writing_name}</td>
                                    <td className={styles.common_check_box} onClick={movePage} id={item.writing_Id}><label name="price">{dividePriceUnit(item.price.toString())}</label></td>
                                    <td className={styles.common_check_box} onClick={movePage} id={item.writing_Id}>{dayjs(item.regit_date).format('YYYY-MM-DD')}</td>
                                </CommonTableRow>
                            ))}
                        </CommonTable>
                    )
                    }
                    {/*<CommonTable headersName={['사진', '상품명', '가격', '상품등록일']}>*/}
                    {/*    {data.map(item=>(*/}
                    {/*        <CommonTableRow>*/}
                    {/*            /!*<td className={styles.common_check_box}><input type="checkbox"  style={{left:"5%"}} name="likeList" value={item.price}/>{item.writing_Id}</td>*!/*/}
                    {/*            <td className={styles.common_check_box} onClick={movePage} id={item.writing_Id}><img src=" http://placekitten.com/150/150" alt=""/></td>*/}
                    {/*            <td className={styles.common_check_box} onClick={movePage} id={item.writing_Id}>{item.writing_name}</td>*/}
                    {/*            <td className={styles.common_check_box} onClick={movePage} id={item.writing_Id}><label name="price">{dividePriceUnit(item.price.toString())}</label></td>*/}
                    {/*            <td className={styles.common_check_box} onClick={movePage} id={item.writing_Id}>{item.regit_date}</td>*/}
                    {/*        </CommonTableRow>*/}
                    {/*    ))}*/}
                    {/*</CommonTable>*/}
                </div>
            </div>
            <br/>
            <br/>
            <br/>
            <br/>
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

export default Inquiry_list;