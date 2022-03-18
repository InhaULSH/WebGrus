import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './write.module.css';

const Write = ({ deleteWrite, write }) => {
	const [toggle, setToggle] = useState(false);
	let user = useSelector((state) => state.user.userData);

	// 글 접었다 폈다 하는 기능
	const toggleDescroption = () => {
		if (toggle) {
			setToggle(false);
		} else {
			setToggle(true);
		}
	};

	// 글 삭제
	const deleteWriteProps = () => {
		deleteWrite(write._id);
	};

	return (
		<>
			<li className={styles.write}>
				<input
					type="button"
					className={`${styles.listItem} ${!toggle ? styles.plusButton : styles.hidden}`}
					onClick={toggleDescroption}
					value="+"
				/>
				<input
					type="button"
					className={`${styles.listItem} ${toggle ? styles.plusButton : styles.hidden}`}
					onClick={toggleDescroption}
					value="-"
				/>
				<div className={styles.listItem}>{write.title}</div>
				<div className={styles.listItem}>{write.author}</div>
				<div className={styles.listItem}>{write.date}</div>
				{(user.id === write.id) | (user.role === 2) ? (
					<button onClick={deleteWriteProps} className={styles.delete}>
						삭제
					</button>
				) : (
					<button className={`${styles.zeroOpacity} ${styles.delete}`}></button>
				)}
			</li>
			{toggle && <p className={styles.description}>{write.description}</p>}
		</>
	);
};
export default Write;
