import React, {useEffect, useState} from 'react';
import { useLocation, useNavigate} from 'react-router-dom';
import styles from '../Css_dir/SearchResult.module.css'
import axios from 'axios';
import ListViewADs from "./ListViewADs";
import profile from '../imgs/logo512_512.png'


function SearchResult() {
    const [data, setData] = useState([])
    const [sortFlag,setFlag] = useState(0)
    const location = useLocation();
    const navigate = useNavigate();

    const searchInfo = { ...location.state };
    const listdata=new FormData();

    listdata.append('search_word', location.search.toString().split("=").at(1));
    //listdata.append('sort','search');  //페이지 넘길때 필요함(>>, >, <, <<)
    if(decodeURIComponent(location.search.toString()).split(/[=?]/).at(1).includes('search_popularity')) listdata.append('sort','search_popularity');  //인기순 정렬
    else if(decodeURIComponent(location.search.toString()).split(/[=?]/).at(1).includes('search_price')) listdata.append('sort','search_price'); //가격순 정렬
    else if(decodeURIComponent(location.search.toString()).split(/[=?]/).at(1).includes('search_sell')) listdata.append('sort','search_sell');   //판매순 정렬
    else listdata.append('sort','search_normal');  //그냥 검색했을때 랜덤으로 뜨게함

    const contents=data;   //받아온 데이터(총 개수)

    const movePage= (event)=>{       //일단 아이디만 받아서 넘겨서 게시물 상세 페이지에서 백엔드로 데베 불어오는게 나을듯(WritingConten 테이블이랑, Writing 테이블 개체 다불러야함)

        let getId=event.currentTarget.id

        navigate('/pages/noticeConfirm?search='+getId, {state:{
                word:getId
            }});
    }
    const dividePriceUnit=(price)=>{
        return price.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");   //금액 1000단위 끊기
    }

    const divideStr=(str)=>{
        if( str.match(/[_.~]/)) return decodeURIComponent(location.search.toString().split("=").at(1).split(/[_.~]/));
        //if( str.match(/[_.~]/)) return decodeURIComponent(location.search.toString()).split("=").at(1).split(/[_.~]/);
        else return decodeURIComponent(location.search.toString().split("=").at(1));
    }

    const contentView=(value=1)=>{

        if(isNaN(parseInt(decodeURIComponent(location.search.toString()).split(/[=?]/).at(1).match(/\d+/g)))) value=1;  //바로 들어왔을때면 NaN되니까 value=1처리
        else value=parseInt(decodeURIComponent(location.search.toString()).split(/[=?]/).at(1).match(/\d+/g));  //페이지가 저장됨(숫자)

        //value=decodeURIComponent(location.search.toString()).split(/[=?]/).at(1);
        //decodeURIComponent(location.search.toString()).split(/[=?]/).at(1).match(/\d+/g);
        //console.log(decodeURIComponent(location.search.toString()).split(/[=?]/).at(1));  //정수형 페이지가 저장됨
        //if(decodeURIComponent(location.search.toString()).split(/[=?]/).at(1).includes('search')) value=1;
        // else if(decodeURIComponent(location.search.toString()).split(/[=?]/).at(1).includes('search_popularity')) value=1;
        // else if(decodeURIComponent(location.search.toString()).split(/[=?]/).at(1).includes('search_price')) value=1;
        // else if(decodeURIComponent(location.search.toString()).split(/[=?]/).at(1).includes('search_sell')) value=1;
        //console.log(value);
        let contentArr=[];
        // for(let j=value*2-2;j<value*2 && j<contents.length;j++){  //15개씩 끊어서 나타냄(15개 넘어가면 다음 페이지)
        for(let j=value*15-15;j<value*15 && j<contents.length;j++){  //15개씩 끊어서 나타냄(15개 넘어가면 다음 페이지)

            contentArr.push(
                <div className={styles.resultMap} onClick={movePage} name="spam" id={contents[j].writing_Id}>
                    {/*<img className={styles.content_picture} src="http://placekitten.com/150/150"></img>*/}
                    {/*<img className={styles.content_picture} src={"data:image/png;base64," + contents[j].writingImg} alt='No Data'></img>*/}
                    {/*<img className={styles.content_picture} src={contents[j].writingImg} alt='No Data'></img>*/
                        <img className={styles.content_picture} src={contents[j].writingImg !=null ? `${atob(contents[j].writingImg)}`:profile} alt='No Data'></img>}
                    <div> <b>{contents[j].writing_name}</b></div>
                    <div>  [판매자]: {contents[j].user_name} </div>
                    <div>  [판매자위치]: {contents[j].userDTO.address} </div>
                    <div>    가격: {dividePriceUnit(contents[j].price.toString())} </div>
                    <div>    판매자 평점:{contents[j].user_point}</div>
                </div>
            )
        }

        return contentArr;
    }
    const contentDivide=(event)=>{   //페이지 별로 끊기(15개씩 끊어서 페이지 분할)

        contentView(event.currentTarget.id);
        // return event.currentTarget.id;
    }
    let pages=[];
    let currentPage=parseInt(decodeURIComponent(location.search.toString()).split(/[=?]/).at(1).match(/\d+/g));

    if(isNaN(currentPage)){  //처음에 오면 현재페이지가 NaN값으로 넘어와짐
        currentPage=1;
    }

    const PageCount=(search_sort)=>{    //하단 총 페이지 수
        const count=data.length/15;
        // console.log((Math.ceil(currentPage/5)*5-9));
        // console.log(Math.floor(count/5));

        for(let i=(Math.ceil(currentPage/5)-1)*5;i<count && i<(Math.ceil(currentPage/5)-1)*5+5;i++){
            if(currentPage===(i+1)){  //현재 페이지면 페이지 번호 진하게 색칠
                pages.push(
                    <span>
                    <form name={search_sort+(i+1)} id={search_sort+(i+1)} method='get'>
                        <input name={search_sort+(i+1)} id={search_sort+(i+1)} placeholder='  검색'defaultValue={decodeURIComponent(location.search.toString()).split("=").at(1)}
                               style={{ display: 'none' }}></input>

                    </form>
                    <button id={search_sort+(i+1)} form={search_sort+(i+1)} className={styles.num} style={{ backgroundColor: 'black', color: 'white' }} onClick={contentDivide}>{i+1}</button>
                </span>
                    // <span id={i+1}  className={styles.num} onClick={contents}>{i+1}</span>
                )
            }else{
                pages.push(
                    <span>
                    <form name={search_sort+(i+1)} id={search_sort+(i+1)} method='get'>
                        <input name={search_sort+(i+1)} id={search_sort+(i+1)} placeholder='  검색'defaultValue={decodeURIComponent(location.search.toString()).split("=").at(1)}
                               style={{ display: 'none' }}></input>

                    </form>
                    <button id={search_sort+(i+1)} form={search_sort+(i+1)} className={styles.num} onClick={contentDivide}>{i+1}</button>
                </span>
                )
            }

        }

        return pages;
    }


    useEffect(() => {   //정렬할거 있으면 정렬해서 가져오기

        axios.post('/api/searchResult',listdata,{
            headers: {
                'Content-Type' : 'multipart/form-data'
            }
        })
            .then(response => setData(response.data))
            .catch(error => console.log(error))
    }, []);
    const firstPage=()=>{
        let ads=[];
        const nowPage=decodeURIComponent(location.search.toString().split(/[=?]/).at(1)).match(/\d+/g)
        if(nowPage==1 || nowPage==null){
            ads.push(
                <ListViewADs></ListViewADs>
            )
        }
        return ads;
    }

    return (
        <div className={styles.wraper}>
            <div className={styles.wrapBox}>
                <br/><br/><br/><br/><br/>
                <div className={styles.headTitle}>
                    <h1 className={styles.title}>검색 결과
                        <span>'{divideStr(location.search.toString().split("=").at(1)) }' 과 관련된 다음 검색 결과입니다..</span>
                    </h1>
                </div>
                <br/><br/>
                <div className={styles.btn_center}>
                    <form name='search_popularity' id='search_popularity' method='get'>
                        <input name='search_popularity' id='search_popularity' placeholder='  검색'defaultValue={decodeURIComponent(location.search.toString().split("=").at(1))}
                               style={{ display: 'none' }}></input>
                    </form>
                    <button type="submit" form="search_popularity" id='search_popularity' className={styles.btn_5} >인기순</button>

                    <form name='search_price' id='search_price' method='get'>
                        <input name='search_price' id='search_price' placeholder='  검색'defaultValue={decodeURIComponent(location.search.toString().split("=").at(1))}
                               style={{ display: 'none' }}></input>
                    </form>
                    <button type="submit" form="search_price" className={styles.btn_5} id='search_price' >가격순</button>

                    {/*<form name='search_sell' id='search_sell' method='get'>*/}
                    {/*    <input name='search_sell' id='search_sell' placeholder='  검색'defaultValue={decodeURIComponent(location.search.toString().split("=").at(1))}*/}
                    {/*           style={{ display: 'none' }}></input>*/}
                    {/*</form>*/}
                    {/*<button type="submit" form="search_sell" className={styles.btn_5} id='search_sell'>판매순</button>*/}
                </div>
                {/*<ListViewADs></ListViewADs>*/}
                {firstPage()}
                <br/>
                <div className={styles.container}>
                    {data.length === 0 ? (
                        <p style={{ fontSize: '25px' }}>받아온 데이터가 없습니다.</p>
                    ):(
                        <div>
                            {contentView(parseInt(location.search.toString().split("=").at(2)))}
                        </div>
                    )

                    }
                </div>
                <br/><br/>
                <hr/>
                <div className={styles.board_wraping}>
                    <div className={styles.board_paging}>
                        {data.length<1?(
                            <></>
                        ):(
                            <span id="<<" className={styles.num}>
                            <form name={listdata.get('sort')+1} id={listdata.get('sort')+1} method='get'>
                                <input name={listdata.get('sort')+1} id={listdata.get('sort')+1}placeholder='  검색'defaultValue={decodeURIComponent(location.search.toString()).split("=").at(1)}
                                       style={{ display: 'none' }}></input>

                            </form>
                            <button id={listdata.get('sort')+1} form={listdata.get('sort')+1} className={styles.num} onClick={contentDivide}>&lt;&lt;</button>
                        </span>
                        )}

                        {(Math.ceil(currentPage/5)*5-9)>=1?(
                            <span id="<" className={styles.num}>
                            <form name={listdata.get('sort')+(Math.ceil(currentPage/5)*5-9)} id={listdata.get('sort')+(Math.ceil(currentPage/5)*5-9)} method='get'>
                                <input name={listdata.get('sort')+(Math.ceil(currentPage/5)*5-9)} id={listdata.get('sort')+(Math.ceil(currentPage/5)*5-9)}placeholder='  검색'defaultValue={decodeURIComponent(location.search.toString()).split("=").at(1)}
                                       style={{ display: 'none' }}></input>

                            </form>
                            <button id={listdata.get('sort')+(Math.ceil(currentPage/5)*5-9)} form={listdata.get('sort')+(Math.ceil(currentPage/5)*5-9)} className={styles.num} onClick={contentDivide}>&lt;</button>
                        </span>
                        ):(
                            <></>
                        ) }

                        {/*<span id="<"  className={styles.num} ><b>〈</b></span>*/}
                        {PageCount(decodeURIComponent(location.search.toString().split(/[=?]/).at(1)).replace(/[0-9]/g, ''))}    {/*현재 어떤 정렬인지 뽑아냄*/}
                        {(Math.ceil(currentPage/5)-1)*5+5<(Math.floor(data.length/15)+1)?(
                            <span id=">" className={styles.num}>
                            <form name={listdata.get('sort')+(Math.ceil(currentPage/5)*5+1)} id={listdata.get('sort')+(Math.ceil(currentPage/5)*5+1)} method='get'>
                                <input name={listdata.get('sort')+(Math.ceil(currentPage/5)*5+1)} id={listdata.get('sort')+(Math.ceil(currentPage/5)*5+1)}placeholder='  검색'defaultValue={decodeURIComponent(location.search.toString()).split("=").at(1)}
                                       style={{ display: 'none' }}></input>

                            </form>
                            <button id={listdata.get('sort')+(Math.ceil(currentPage/5)*5+1)} form={listdata.get('sort')+(Math.ceil(currentPage/5)*5+1)} className={styles.num} onClick={contentDivide}>&gt;</button>
                        </span>
                        ):(
                            <></>
                        ) }
                        {/*<span id=">" className={styles.num} ><b>〉</b></span>*/}
                        {data.length<1?(
                            <></>
                        ):(
                            <span id=">>" className={styles.num}>
                            <form name={listdata.get('sort')+(Math.ceil(data.length/15))} id={listdata.get('sort')+(Math.ceil(data.length/15))} method='get'>
                                <input name={listdata.get('sort')+(Math.ceil(data.length/15))} id={listdata.get('sort')+(Math.ceil(data.length/15))}placeholder='  검색'defaultValue={decodeURIComponent(location.search.toString()).split("=").at(1)}
                                       style={{ display: 'none' }}></input>

                            </form>
                            <button id={listdata.get('sort')+(Math.ceil(data.length/15))} form={listdata.get('sort')+(Math.ceil(data.length/15))} className={styles.num} onClick={contentDivide}>&gt;&gt;</button>
                            </span>
                        )

                        }
                    </div>
                </div>
            </div>
            <footer className={styles.footer_div}>

            </footer>

        </div>
    );
}

export default SearchResult;