import React from 'react';
import styles from'./CommonTable.module.css';

const CommonTableColumn = ({ children }) => {
    const movePage= ()=>{
        document.location.href="/pages/noticeConfirm";
    }
    return (
        <td className={styles.common_table_header_column} onClick={movePage}>
            {
                children
            }
        </td>
    )
}

export default CommonTableColumn;