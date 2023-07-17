import styles from '../Css_dir/Chat.module.css'
import profile from '../imgs/logo512_512.png'
import React, {useEffect, useRef, useState} from 'react';
import MessageList from './MessageList';
import ChatList from './ChatList';
import Painting from '../imgs/temp_painting.png';
import guidance from '../imgs/temp_map.png';
import XButton from '../imgs/XButton.png';
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Chat() {
    const [isOpen, setIsOpen] = useState(false);
    const movePage = useNavigate();
    const mapStyles = {
        height: '400px',
        width: '100%'
    };

    const defaultCenter = {
        lat: 37.7749,
        lng: -122.4194
    };

    const [userImg, setUserImg] = useState([]);

    const [messages, setMessages] = useState([]);
    const [chatRooms, setChatRooms] = useState([]);
    // 메시지 및 채팅방 목록을 저장하기 위한 useState.

    const [toMessageList, setToMessageList] = useState({});
    const [toChatList, setToChatList] = useState({});
    // MessageList.js, chatList.js로 들어가는 데 사용되는 매개변수들
    // MessageList의 경우 Op_Id (상대방 닉네임), amIBuyer(내가 구매자인지)에 대한 내용을 담음
    // ChatList의 경우 사용자의 email, isClicked(어떤 채팅방이 클릭되었는지)에 대한 내용을 담음

    const [currentRoomId, setRoomId] = useState();
    // 현재 선택한 방 번호를 담고 있음

    const [sendText, setSendText] = useState('');    // 입력창에 있는 글자를 저장
    const [previewImage, setPreviewImage] = useState(null); // 미리보기 이미지를 저장
    const [fileInputKey, setFileInputKey] = useState(Date.now());
    // Input 태그로 파일을 저장했다가 취소하면 다시 그 파일을 꺼냈을 때 미리보기가 안되는 버그 때문에
    // 취소할 때마다 Date.now()를 통해 키 값을 계속 변경함

    const [isBigger, setIsBigger] = useState(false);
    const [isNotFormal, setIsNotFormal] = useState(false);
    // 이미지가 용량이 큰지, 형식이 맞는지에 변수

    const [socketMap, setSocketMap] = useState(new Map());
    // 사용자 마다 생성된 채팅방 socket 정보를 저장하기 위함

    const imageInput = useRef();
    // 이미지 버튼을 만들기 위한 Ref

    const maxSize = 4 * 1024 * 1024;
    // 이미지 파일 최대 사이즈 4MB로 함

    useEffect(() => {
        axios.get('/check')
            .then((response)=>{
                console.log(response.data)
                if(response.data){
                    console.log('now login');
                }
                else{
                    console.log('need login');
                    document.cookie = "isLogin=false; path=/; expires=Thu, 01 JAN 1999 00:00:10 GMT";
                    alert('로그인이 필요합니다.');
                    movePage('/pages/loginPage');
                }
            }).catch(error=>{
            console.error(error);
            console.log('need login');
            document.cookie = "isLogin=false; path=/; expires=Thu, 01 JAN 1999 00:00:10 GMT";
            alert('로그인이 필요합니다.');
            movePage('/pages/loginPage');
        });

        const socket = new WebSocket('ws://panda1562.iptime.org:8080/chat');

        socket.onopen = () => {
            console.log("소켓 열림");
        }
        socket.onmessage = (event) => {
            let receivedMap = JSON.parse(event.data);
            setUserImg(receivedMap.userImg);
            setChatRooms(receivedMap.chatRooms);
            setToChatList(prevState => ({...prevState, email:receivedMap.email}));

            receivedMap.chatRooms.forEach((chatRoom, index) => {
                let room = socketMap.get(chatRoom.roomId);

                if (room == null) {
                    let room = new WebSocket(`ws://panda1562.iptime.org:8080/chat/${chatRoom.roomId}`);
                    socketMap.set(chatRoom.roomId, room);

                    room.onopen = () => {
                        socketMap.set(chatRoom.roomId, room);
                    }

                    room.onmessage = (event) => {
                        let parsedMap = JSON.parse(event.data);

                        let type = parsedMap.type; // 해당 메시지 정보

                        // 스크롤을 내려야 하는가 true or false,
                        // 더 이상 불러올 메시지가 없는가 full의 내용이 담김.
                        // 또한 채팅을 보낸 사람 sender, 받은 사람 receiver 내용이 담김.
                        // console.log(type);
                        if (type === "evaluate") {
                            let evaluateRoom = parsedMap.evaluateRoom;

                            setToMessageList(prevState => ({...prevState,
                                evaluateBuyer: evaluateRoom.evaluateBuyer,
                                evaluateSeller: evaluateRoom.evaluateSeller}));

                            setMessages(prevState => {
                             const newArray = [...prevState];
                             newArray[0].type = "evaluate";
                             return newArray;
                            });
                        }
                        else if (type === "exit") {
                            let amIExit = parsedMap.amIExit;
                            let exitedRoomId = parsedMap.exitedRoomId;

                            if(amIExit) {
                                setChatRooms(prevRooms => prevRooms.map(room => {
                                    if(room.roomId === exitedRoomId) {
                                        if (receivedMap.email === room.buyer.email)
                                            return {...room, isExitBuyer: true};
                                        else return {...room, isExitSeller: true};
                                    } else {
                                        return room;
                                    }
                                }));
                                chatListClick(null, null, null, null);
                                setRoomId(null);
                            }
                        }

                        else if (type === "chatList") {  // type === "chatList"" -> 채팅방을 클릭했다는 의미
                            let chatList = parsedMap.messages;  // 채팅방을 눌렀을 때 가져올 메시지 목록
                            let messageType = parsedMap.messageType; // -> 해당 메시지가 어떤 정보를 담고 있는지

                            if(chatList[0] != null)
                                chatList[chatList.length - 1].type = messageType;

                            let currentRoom = parsedMap.currentRoom;
                            let myRoomId = parsedMap.myRoomId;  // 현재 내가 보고있는 채팅창 번호

                            chatList.forEach((room, index) => {
                               if(room.roomId === myRoomId) {
                                    room.noRead = false;
                               }
                            });

                            setToMessageList(prevState => ({...prevState,
                                evaluateBuyer: currentRoom.evaluateBuyer,
                                evaluateSeller: currentRoom.evaluateSeller,
                                isChatbot:currentRoom.seller.email === 'chatbot'}));

                            setMessages(chatList);
                        }
                        // 상대나 자신이 메시지를 보낸게 아니면
                        // 메시지 리스트를 가져와 저장

                        else if (type === "chat") {    // chat != null -> 상대나 내가 메시지를 보냈다는 의미
                            // 메시지를 보낸거라면 메시지 목록 갱신 및 채팅방 목록 갱신

                            let amIBuyer = parsedMap.amIBuyer;  // 내가 구매자인지?
                            let myRoomId = parsedMap.myRoomId;  // 현재 내가 보고있는 채팅창 번호
                            let chat = parsedMap.message;       // 상대 또는 내가 보낸 메시지 1개
                            let messageType = parsedMap.messageType; // -> 해당 메시지가 어떤 정보를 담고 있는지

                            if(chatRoom.roomId === chat.roomId) {
                                setChatRooms((prevChatRooms) => {
                                    const updatedChatRooms = prevChatRooms.map((chatRoom) => {
                                        if (chatRoom.roomId === chat.roomId) {
                                            if(myRoomId !== chat.roomId) {
                                                return {...chatRoom, lastContent: chat.content, lastDate: chat.chatDate,
                                                noRead: true, noReadBuyer: amIBuyer, isExitBuyer:false, isExitSeller:false}
                                            }
                                            return {...chatRoom, lastContent: chat.content, lastDate: chat.chatDate, isExitBuyer:false, isExitSeller:false};
                                        }
                                        return chatRoom;
                                    });

                                    const updatedChatRoom = updatedChatRooms.find((chatRoom) => chatRoom.roomId === chat.roomId);

                                    if(updatedChatRoom) {
                                        const filteredChatRooms = updatedChatRooms.filter((chatRoom) => chatRoom.roomId !== chat.roomId);
                                        return [updatedChatRoom, ...filteredChatRooms];
                                    }

                                    return prevChatRooms;
                                });
                            }

                            if(chat.roomId === myRoomId) {  // 현재 그 채팅창을 보고 있다는 의미
                                if (messageType === 'sender')
                                    // 내가 메시지를 보낸거면 스크롤을 내림
                                    chat.type = 'true';
                                else
                                    chat.type = 'isBottom';

                                // 내가 메시지를 받는거면 스크롤이 하단에 있는지 확인하고 내려야 하기 때문에
                                // isBottom 문자열을 기록.

                                // 메시지의 roomId와 현재 열린 채팅창의 roomId와 같으면 Messages 목록에 메시지 추가
                                setMessages((prevMessages) => [...prevMessages, chat]);
                            }
                        }
                    }
                }
            });
        };
        return () => {
            console.log("닫힘");
        }
    }, []);

    useEffect(() => {
        if(currentRoomId) {
            let roomSocket = socketMap.get(currentRoomId);
            if(roomSocket == null) {
                console.log("채팅방이 없는뎄?");
            }

            roomSocket.send(JSON.stringify({
                roomId: currentRoomId,
                count: 0,
                type: "click",
            }));
            setIsBigger(false);
            setIsNotFormal(false);
        }
    }, [currentRoomId])

    const handleFileChange = (event) => {
        if(event.target.files[0] == null) {
            return;
        }
        const file = event.target.files[0];

        const fileExtension = file.name.split('.').pop().toLowerCase();
        const allowedExtensions = ['jpg', 'jpeg', 'png'];

        if (!allowedExtensions.includes(fileExtension)) {
            setIsNotFormal(true);
            setPreviewImage(null);
            return;
        }

        if (file.size > maxSize) {
            setIsBigger(true);
            setPreviewImage(null);
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
        setIsNotFormal(false);
        setIsBigger(false);
    }

    const handleKeyPress= (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleUpload();
        }
    };

    const chatListClick = (roomId, op, amIBuyer, userImg) => {
        setRoomId(roomId);
        setToMessageList(prevState => ({...prevState, op_Id: op, amIBuyer: amIBuyer, userImg:userImg, roomId:roomId}));
        setToChatList(prevState => ({...prevState, roomId:roomId}));
        setChatRooms(prevChatRooms => {
           return prevChatRooms.map(chatRoom => {
               if (chatRoom.roomId === roomId)
                   return { ...chatRoom, noRead:false };
               return chatRoom;
           });
        });
    };

    const handleUpload = () => {
        if(sendText === '' && !previewImage) return;

        let room = socketMap.get(currentRoomId);
        let message;

        if(previewImage) {
            message = {
                roomId: currentRoomId,
                fromBuyer:toMessageList.amIBuyer,
                content: null,
                chatDate: null,
                photo: btoa(previewImage),
                type: "send",
            };  // photo
        } else {
            message = {
                roomId: currentRoomId,
                fromBuyer:toMessageList.amIBuyer,
                content: sendText,
                chatDate: null,
                photo: null,
                type: "send",
            };  // text
            setSendText('');
        }
        
        room.send(JSON.stringify(message));
        setPreviewImage(null);
        setIsBigger(false);
        setIsNotFormal(false);
    };

    const XButtonClick = () => {
        setPreviewImage(null);
        setFileInputKey(Date.now());
    };

    const imageSelectClick = () => {
        imageInput.current.click();
    }

    const menuLClick = () =>{
        setIsOpen(!isOpen);
    }

    return (
        <div className={styles.chat_page}>
            <div className={(!isOpen ? `${styles.menuL}` : `${styles.emenuL}`)} onClick={menuLClick}>
                <img src={'/imgs/right_btn.png'}/>
                <div className={styles.plist}>
                    <ul>
                        <li className={styles.profile_First}>
                            <div className={styles.p_profile}>
                                <img src={userImg == null ? profile : atob(userImg)} width="100%" height="100%"></img>
                            </div>
                            <div className={styles.p_info}>
                                <div className={`${styles.p_name} ${styles.whitesmoke_color}`}>나</div>
                                <div className={`${styles.p_time} ${styles.whitesmoke_color}`}></div>
                                <div className={`${styles.p_last_message} ${styles.whitesmoke_color}`}/>
                            </div>
                        </li>
                    </ul>
                    <ChatList chatRooms={chatRooms} onClick={chatListClick} toChatList={toChatList}/>
                </div>
            </div>
            <div className={styles.plist}>
                <ul>
                <li className={styles.profile_First}>
                        <div className={styles.p_profile}>
                            <img src={userImg == null ? profile : atob(userImg)} width="100%" height="100%"></img>
                        </div>
                        <div className={styles.p_info}>
                            <div className={`${styles.p_name} ${styles.whitesmoke_color}`}>나</div>
                            <div className={`${styles.p_time} ${styles.whitesmoke_color}`}></div>
                            <div className={`${styles.p_last_message} ${styles.whitesmoke_color}`}/>
                        </div>
                    </li>
                </ul>
                <ChatList chatRooms={chatRooms} onClick={chatListClick} toChatList={toChatList}/>
            </div>

            {currentRoomId != null ?
                <div className={styles.chat_container}>

                    <MessageList messages={messages} toMessageList={toMessageList} socket={socketMap.get(currentRoomId)} />
                    <div className={styles.chat_message} >
                        <div className={styles.error_message}>
                            {
                                isBigger === true ? `이미지 용량 제한은 ${maxSize / (1024 * 1024)}MB 입니다.` : isNotFormal === true ? "이미지 파일이 아닙니다." : null
                            }
                        </div>
                        <div className={`${styles.image_preview_box} ${previewImage === null ? styles.button_hidden : null}`}>
                            <img src={XButton} width="2.5%" onClick={XButtonClick}/>
                            <div className={styles.image_preview}>
                                <img src={previewImage} width="100%" height="100%"/>
                            </div>
                        </div>
                    <textarea name={styles.send_message} placeholder={"메시지를 입력하세요."} rows="3" value={sendText} onChange={(event) => setSendText(event.target.value)} onKeyPress={handleKeyPress}></textarea>
                    <button onClick={handleUpload}>전송</button>
                        <img src={Painting} className={styles.painting} onClick={imageSelectClick} />
                        {/*<img src={guidance} className={styles.map}  />*/}
                        <input type="file" ref={imageInput} className={styles.button_hidden} key={fileInputKey} onChange={handleFileChange} />
                    </div>
                </div>
                :
                <div className={styles.chat_container}>
                    <div className={styles.chat_header} />
                    <div className={styles.chat_history}>
                        <div className={styles.no_room_selected}>채팅 방을 클릭해주세요.</div>
                    </div>
                    <div className={styles.chat_message} />
                </div>

            }

        </div>
    );
}

export default Chat;
