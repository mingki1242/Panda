import React from 'react';
import styles from'./CommonTable.module.css';
const CommonTableRow = ({ children }) => {

    return (
        <tr className={styles.common_table_row}>
            {
                children
            }
        </tr>
    )
}

export default CommonTableRow;