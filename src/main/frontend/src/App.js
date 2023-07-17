import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from 'react';
import CommonTable from './Tables/CommonTable';
import CommonTableColumn from './Tables/CommonTableColumn';
import CommonTableRow from './Tables/CommonTableRow';
import {Routes, Route, Link, NavLink, useNavigate, useLocation} from 'react-router-dom';
import axios from 'axios';
import OtherPage from "./pages/OtherPage";
import OtherPage2 from "./pages/OtherPage2";
import BoughtList from "./pages/BoughtList";
import FixBar from "./pages/FixBar";
import Chat from "./pages/Chat";
import SearchResult from "./pages/SearchResult";
import LogInPage from "./pages/login_page";
import MemPage from "./pages/joinmem_page";
import Home from "./pages/home";
import Notice from "./pages/noticePage";
import NoticeRegist from "./pages/noticeRegist";
import NoticeConfirm from "./pages/noticeConfirm";
import NoticeModify from "./pages/noticeModify";
import Home_unlogin from "./pages/home_unlogin";
import Inquiry_list from "./pages/Inquiry_list";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import TopNav from "./pages/top_navigation";
import noticeConfirm from "./pages/noticeConfirm";

function App() {
    return (
        <TransitionGroup className={'transition-wrapper'}>
            <TopNav></TopNav>
            <CSSTransition key={useLocation().pathname} timeout={300} classNames={'pages_push_controll'}>
                <div id='root'>
                    <Routes>
                        <Route path="/" element={document.cookie.match('isLogin' + '=([^;]*)(;|$)') ? <Home/>:<Home_unlogin/>}></Route>
                        <Route path="/pages/loginPage" element={<LogInPage/>}></Route>
                        <Route path="/pages/joinMemPage" element={<MemPage/>}></Route>
                        <Route path="/pages/OtherPage" exact={true} element={<OtherPage />}/>
                        <Route path="/pages/OtherPage2" exact={true} element={<OtherPage2 />}/>
                        <Route path="/pages/Inquiry_list" exact={true} element={<Inquiry_list />}/>
                        <Route path="/pages/BoughtList" exact={true} element={<BoughtList />}/>
                        <Route path="/pages/FixBar" exact={true} element={<FixBar />}/>
                        <Route path="/pages/Chat" exact={true} element={<Chat />}/>
                        <Route path="/pages/SearchResult" exact={true} element={<SearchResult />}/>
                        <Route path="/pages/noticePage" exact={true} element={<Notice/>}/>
                        <Route path="/pages/noticeRegist" exact={true} element={<NoticeRegist/>}/>
                        <Route path="/pages/noticeConfirm" exact={true} element={<NoticeConfirm/>}/>
                        <Route path="/pages/noticeConfirm/:writing_Id" component={noticeConfirm} />
                        <Route path="/pages/noticeModify" exact={true} element={<NoticeModify/>}/>
                    </Routes>
                </div>
            </CSSTransition>
        </TransitionGroup>
    );
}

export default App;
