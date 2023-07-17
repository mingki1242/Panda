import '../App.css';
import React, {useEffect, useState} from 'react';
import CommonTable from '../Tables/CommonTable';
import CommonTableColumn from '../Tables/CommonTableColumn';
import CommonTableRow from '../Tables/CommonTableRow';
import {Routes,Route,Link,NavLink,useNavigate} from 'react-router-dom';
import FixBar from "./FixBar";
import axios from 'axios';
import styles from "../Css_dir/SearchResult.module.css";
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import profile from "../imgs/logo512_512.png";
dayjs.locale('ko');


function BoughtList() {
    const [data, setData] = useState([])
    const movePage= ()=>{
        document.location.href="/pages/OtherPage2";
    }

    const dividePriceUnit=(price)=>{
        return price.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    }


    useEffect(() => {
        axios.post('/api/purchaseList',null,{})
            .then(response => setData(response.data))
            .catch(error => console.log(error))
    }, []);

    return (
        <div className={styles.wraper}>
            <div className={styles.wrapBox}>
                <FixBar></FixBar>
                <br/>
                <br/>
                <div className={styles.headTitle}>
                    <h1 className={styles.title}>구매 목록
                        <span>사용자가 구매한 중고물품 목록입니다..</span>
                    </h1>
                </div>
                <br/><br/>

                <br/><br/>
                {data.length === 0 ? (
                    <p style={{ fontSize: '25px' }}>검색된 구매이력이 없습니다...!</p>
                ):(
                    <CommonTable headersName={['사진', '상품명','가격', '구매완료일', '판매자']}>
                        {data.map(item=>(
                            <CommonTableRow>
                                <td className={styles.common_check_box}><img width={150} height={150} src={item.writingCompleteDTO.writing_photo !=null ? `${atob(item.writingCompleteDTO.writing_photo)}`:profile} alt=""/></td>
                                <td className={styles.common_check_box}>{item.writingCompleteDTO.writing_name}</td>
                                <td className={styles.common_check_box}><label name="price">{dividePriceUnit(item.writingCompleteDTO.price.toString())}</label></td>
                                <td className={styles.common_check_box}>{dayjs(item.purchase_date).format("YYYY-MM-DD")}</td>
                                <td className={styles.common_check_box}>{item.writingCompleteDTO.userDTO.nickname}</td>
                            </CommonTableRow>
                        ))}
                    </CommonTable>
                )
                }
                {/*<CommonTable headersName={['사진', '상품명','가격', '구매완료일', '판매자']}>*/}
                {/*    {data.map(item=>(*/}
                {/*        <CommonTableRow>*/}
                {/*            <td className={styles.common_check_box}><img src=" http://placekitten.com/150/150" alt=""/></td>*/}
                {/*            <td className={styles.common_check_box}>{item.writingCompleteDTO.writing_name}</td>*/}
                {/*            <td className={styles.common_check_box}><label name="price">{dividePriceUnit(item.writingCompleteDTO.price.toString())}</label></td>*/}
                {/*            <td className={styles.common_check_box}>{dayjs(item.purchase_date).format("YYYY-MM-DD")}</td>*/}
                {/*            <td className={styles.common_check_box}>{item.writingCompleteDTO.userDTO.nickname}</td>*/}
                {/*        </CommonTableRow>*/}
                {/*    ))}*/}
                {/*</CommonTable>*/}

                <br/><br/><br/><br/><br/><br/><br/><br/>
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

export default BoughtList;