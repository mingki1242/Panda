import React, {useEffect, useState} from "react";
import axios from "axios";
import styles from '../Css_dir/SearchResult.module.css'
import FixBar from "./FixBar";
import CommonTable from "../Tables/CommonTable";
import CommonTableRow from "../Tables/CommonTableRow";
import {Link, useLocation, useNavigate} from "react-router-dom";
import profile from "../imgs/logo512_512.png";

function ListViewADs() {

    const [advertise, setAdvertise] = useState([]);
    const navigate = useNavigate();

    const dividePriceUnit=(price)=>{
        return price.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    }
    const movePage= (event)=>{       //일단 아이디만 받아서 넘겨서 게시물 상세 페이지에서 백엔드로 데베 불어오는게 나을듯(WritingConten 테이블이랑, Writing 테이블 개체 다불러야함)

        let getId=event.currentTarget.id
        navigate('/pages/noticeConfirm?search='+getId, {state:{
                word:getId
            }});
    }

    useEffect(() => {   //정렬할거 있으면 정렬해서 가져오기

        axios.post('/api/todayAds',null,{

        })
            .then(response => {setAdvertise(response.data)
                console.log(advertise)
            })
            .catch(error => console.log(error))
    }, []);


    return (
        <div className={styles.advertise_box}>

            <div className={styles.container}>
                {advertise.map(item => (
                    <div className={styles.resultMap} onClick={movePage} name="spam" id={item.writingId}>
                        {/*<img width={200} height={200} className={styles.content_picture} src={"data:image/png;base64," + item.writingImg} alt='No Data'></img>*/}
                        <img width={200} height={200} className={styles.content_picture} src={item.writingImg !=null ? `${atob(item.writingImg)}`:profile} alt='No Data'></img>
                        <div> <b>{item.writingName}</b></div>
                        <div>  [판매자위치]: {item.addr} </div>
                        <div>    가격: {dividePriceUnit(item.price.toString())} </div>
                        <div>    판매자 평점:{item.userPoint}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ListViewADs;