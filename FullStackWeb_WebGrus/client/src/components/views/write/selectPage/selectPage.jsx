import React from 'react';
import styles from './selectPage.module.css';

const SelectPage = ({ page, pageChange }) => {
	// page + 1 을 하는 이유는 index가 0부터 시작하기 때문
	const handlsPage = () => {
		pageChange(page + 1);
	};

	return <input className={styles.page} type="button" value={page + 1} onClick={handlsPage} />;
};

export default SelectPage;
