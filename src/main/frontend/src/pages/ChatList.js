import React, {useEffect, useState} from 'react';
import styles from '../Css_dir/Chat.module.css'
import profile from "../imgs/logo512_512.png";
import notify from "../imgs/noReadNotify.png";
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
dayjs.locale('ko');

const ChatList = React.memo(({ chatRooms, onClick, toChatList}) => {

    if(!chatRooms[0]) return;
    return (
        <ul>
            {chatRooms.map((chatList, index) => {

                if(chatList.buyer.email === toChatList.email && chatList.isExitBuyer) {
                    return null;
                }

                if (chatList.seller.email === toChatList.email && chatList.isExitSeller) {
                    return null;
                }

                const date1 = dayjs(chatList.lastDate);
                const date2 = dayjs(new Date());

                let diff;

                if (date2.diff(date1, 'year') > 0)
                    diff = date2.diff(date1, 'year') + "년 전";
                else if (date2.diff(date1, 'month') > 0)
                    diff = date2.diff(date1, 'month') + "달 전";
                else if (date2.diff(date1, 'week') > 0)
                    diff = date2.diff(date1, 'week') + "주 전";
                else if (date2.diff(date1, 'day') > 1)
                    diff = date2.diff(date1, 'day') + "일 전";
                else if (date2.diff(date1, 'day') == 1)
                    diff = "어제";
                else diff = `${date1.format("A h:mm")}`;

                let isMe = chatList.buyer.email === toChatList.email;
                return (
                    <li className = {`${styles.profile_list} ${toChatList.roomId === chatList.roomId ? styles.profile_list_clicked : null}`} key={index} onClick={() => onClick(chatList.roomId,
                        isMe ? chatList.seller.nickname : chatList.buyer.nickname,
                        isMe,
                    isMe ? chatList.seller.userImg === null ? profile : atob(chatList.seller.userImg) :
                    chatList.buyer.userImg === null ? profile : atob(chatList.buyer.userImg))} >
                        <div className={styles.p_profile} >
                            <img src={chatList.buyer.email === toChatList.email ?
                                chatList.seller.userImg === null ? profile : atob(chatList.seller.userImg) :
                                chatList.buyer.userImg === null ? profile : atob(chatList.buyer.userImg)} width="100%" height="100%"></img>
                        </div>
                        <div className={styles.p_info}>
                            {
                                isMe ?
                                    <div className={`${toChatList.roomId === chatList.roomId ? styles.black_color : styles.whitesmoke_color} ${styles.p_name}`}>
                                        {chatList.seller.nickname}
                                    </div>
                                    :
                                    <div className={`${toChatList.roomId === chatList.roomId ? styles.black_color : styles.whitesmoke_color } ${styles.p_name}`}>
                                        {chatList.buyer.nickname}
                                    </div>
                            }
                            <div className={`${toChatList.roomId === chatList.roomId ? styles.black_color : styles.whitesmoke_color } ${styles.p_time}`}>{date1.isValid() ? diff : null}</div>
                            {
                                chatList.writing !== null ?
                                    <div className={`${toChatList.roomId === chatList.roomId ? styles.black_color : styles.whitesmoke_color} ${styles.p_writing_name}`}>
                                        {   chatList.writing.writing_name + "\n"}
                                    </div>
                                        :
                                        <></>
                            }
                            <div className={`${toChatList.roomId === chatList.roomId ? styles.black_color : styles.whitesmoke_color} ${styles.p_last_message}`}>
                                {chatList.lastContent === null ?
                                    "사진" : chatList.lastContent}
                                <div className={`${styles.no_read_message}`}>
                                    {chatList.noRead && chatList.noReadBuyer === (toChatList.email === chatList.buyer.email) ?
                                        <img src={notify} width="5px"/> : null}
                                </div>
                            </div>
                        </div>
                    </li> )
            })}
        </ul>
    );
}, (prevProps, nextProps) => {
    if (prevProps.chatRooms === nextProps.chatRooms &&
    prevProps.toChatList === nextProps.toChatList &&
    prevProps.onClick === nextProps.onClick)
    {
        return true;
    }
    return false;
});

export default ChatList;