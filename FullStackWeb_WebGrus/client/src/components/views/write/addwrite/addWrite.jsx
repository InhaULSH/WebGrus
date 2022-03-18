import React, { useRef } from 'react';
import styles from './addWrite.module.css';

const AddWrite = ({ user, addWriting }) => {
	const today = new Date();
	const textRef = useRef();
	const titleRef = useRef();

	// 글 추가
	const writing = () => {
		const newWrite = {
			id: user.id,
			title: titleRef.current.value,
			description: textRef.current.value,
			author: user.name,
			date: `${today.getFullYear()}. ${today.getMonth() + 1}. ${today.getDate()}`,
		};
		addWriting(newWrite); // 새로 쓴 글 상위 컴포넌트로 전달
	};

	return (
		<form className={styles.addForm}>
			제목 : <input ref={titleRef} type="text"></input>
			내용 : <textarea className={styles.textarea} ref={textRef}></textarea>
			<input type="button" value="글 작성" onClick={writing}></input>
		</form>
	);
};

export default AddWrite;
