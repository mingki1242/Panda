import React from 'react';
import styles from'./CommonTable.module.css';

const CommonTable = props => {
    const { headersName, children } = props;

    return (
        <table className={styles.common_table}>
            <thead>
            <tr>
                {
                    headersName.map((item, index) => {
                        return (
                            <td className={styles.common_table_header_column} key={index}>{ item }</td>
                        )
                    })
                }
            </tr>
            </thead>
            <tbody>
            {
                children
            }
            </tbody>
        </table>
    )
}

export default CommonTable;