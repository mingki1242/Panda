import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "../Css_dir/notice.module.css";
function NoticeRegist(){
    const movePage = useNavigate();
    function alertmessage()
    {
        alert("정상 수정 되었습니다");
    }
    function gohome() {
        movePage('/');
    }

    function gonoticepage()
    {
        movePage('/pages/noticePage');
    }

    return(
        <div>
            <div className={styles.board_wrap}>
                <div className={styles.board_title}>
                    <strong>게시글 수정</strong>
                    <p>판매자는 게시글을 수정 할 수 있습니다.</p>
                </div>
                <div className={styles.board_write_wrap}>
                    <div className={styles.board_write}>
                        <div className={styles.title}>
                            <dl>
                                <dt>제목</dt>
                                <dd><input type="text" placeholder="제목 입력" value="글 제목이 들어갑니다."></input></dd>
                            </dl>
                        </div>
                        <div className={styles.info}>
                            <dl>
                                <dt>글쓴이</dt>
                                <dd><input type="text" placeholder="글쓴이 입력" value="박민기"></input></dd>
                            </dl>
                            <dl>
                                <dt>등록물품(사진) 추후 수정</dt>
                                <dd><input type="password" placeholder="비밀번호 입력" value="****"></input></dd>
                            </dl>
                        </div>
                        <div className={styles.cont}>
                            <textarea placeholder="내용 입력" value="글 내용이 들어갑니다."></textarea>
                        </div>
                    </div>
                    <div className={styles.bt_wrap}>
                        <a onClick={alertmessage} className={styles.on}>수정</a>
                        <a onClick={gonoticepage}>취소</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NoticeRegist;
