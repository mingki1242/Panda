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

function OtherPage() {
    const [data, setData] = useState([]);
    const [price,setPrice]=useState(0);
    const navigate = useNavigate();

    const movePage= (event)=>{
        const getId=event.currentTarget.id
        navigate('/pages/noticeConfirm?search='+getId, {state:{
                word:getId
            }});
        //document.location.href="/pages/OtherPage";
    }

    const getCheckCnt=()=>{
        //선택 항목 수 체크
        const query='input[name="likeList"]:checked';
        const selectedElements= document.querySelectorAll(query);
        const selectedCNT=selectedElements.length;
        document.getElementById('selectCount').innerText
            = selectedCNT;

        //선택 총 가격 체크
        const query2='input[name="likeList"]:checked';
        const selectedElements2= document.querySelectorAll(query2);
        let sum=0;
        selectedElements2.forEach(function (element){
            sum=sum+Number(element.getAttribute('value'));

        });
        document.getElementById('selectPrice').innerText= dividePriceUnit(sum.toString());
    }

    const dividePriceUnit=(price)=>{
        return price.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");   //금액 1000단위 끊기
    }
    const Btn_del=()=>{
        const arr=[];
        const query='input[name="likeList"]:checked';
        const selectedElements= document.querySelectorAll(query);
        selectedElements.forEach(function (element){
            const wid=element.parentElement.textContent;
            console.log(wid);
            arr.push(wid);
        })

        const listdata=new FormData();
        listdata.append('id', 12);
        listdata.append('writing_name', "1234");
        listdata.append('list', arr.join(","));

        if(selectedElements.length===0){
            alert('선택한 제품이 없습니다!');
            return;
        }

        axios.post('/api/del_item', listdata,{     //post방식
            headers: {
                'Content-Type' : 'multipart/form-data'
            }
        }).then((response)=>{
            console.log('성공');
        }).catch(error=>{
            console.error(error);
        })
        alert('선택하신 제품(들)이 삭제되었습니다.');
        window.location.reload();
        //document.location.href="/pages/OtherPage";
    }

    useEffect(() => {    //일단 글목록 가져옴 (나중에 찜 목록 가져와야함)
        axios.get('/api/favoriteList')
            .then(response => setData(response.data))
            .catch(error => console.log(error))
    }, []);
    useEffect(() => {
        axios.get('/api/list_totalPrice')  //목록에 있는 가격들 총합
            .then(response => {
                setPrice(response.data);
            })
    }, []);

    return (
        <div className={styles.wraper}>
            <div className={styles.wrapBox}>
                <FixBar></FixBar>
                <br/>
                <div id='root'>
                    <br/>
                    <div className={styles.headTitle}>
                        <h1 className={styles.title}>찜 목록
                            <span>사용자가 선택한 찜 목록입니다..</span>
                        </h1>
                    </div>
                    <br/><br/>
                    <div className="card" >
                        <div className="card-header">
                            찜 목록
                        </div>
                        <ul className="list-group list-group-flush">

                            <li className="list-group-item">선택된 제품 수: <span id="selectCount"></span></li>
                            <li className="list-group-item">목록 내 모든 상품 가격: <span id="totalPrice">{dividePriceUnit(price.toString())}  </span></li>
                            <li className="list-group-item">선택한 상품 가격: <span id="selectPrice"></span></li>
                        </ul>
                    </div>
                    <br/><br/>
                    <CommonTable headersName={['선택/제품id','사진', '상품명', '가격', '상품등록일']}>
                        {data.map(item=>(
                            <CommonTableRow>
                                <td className={styles.common_check_box}><input type="checkbox" onClick={getCheckCnt} style={{left:"5%"}} name="likeList" value={item.price}/>{item.writing_id}</td>
                                <td className={styles.common_check_box} onClick={movePage} id={item.writing_id}><img width={150} height={150} src={item.writingDTO.writingImg !=null ? `${atob(item.writingDTO.writingImg)}`:profile}alt=""/></td>
                                <td className={styles.common_check_box} onClick={movePage} id={item.writing_id}>{item.writing_name}</td>
                                <td className={styles.common_check_box} onClick={movePage} id={item.writing_id}><label name="price">{dividePriceUnit(item.price.toString())}</label></td>
                                <td className={styles.common_check_box} onClick={movePage} id={item.writing_id}>{dayjs(item.regit_date).format('YYYY-MM-DD') }</td>
                            </CommonTableRow>
                        ))}
                    </CommonTable>


                    <br/><br/><br/>
                    <button className={styles.changePage} onClick={ Btn_del }>선택 삭제</button>
                    <br/><br/><br/>

                    <br/><br/><br/>
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

export default OtherPage;