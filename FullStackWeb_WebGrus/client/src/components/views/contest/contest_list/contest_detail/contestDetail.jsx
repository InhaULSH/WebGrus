import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './contestDetail.module.css';
import Write from '../../../write/write';
import AddWrite from '../../../write/addwrite/addWrite';
import axios from 'axios';
import { useEffect } from 'react';

const ContestDetail = ({ detail }) => {
	const [addWrite, setAddWriting] = useState(false);
	const [writes, setWrites] = useState([]);
	let user = useSelector((state) => state.user.userData);

	useEffect(() => {
		// 모집 글 목록 불러오기
		axios
			.get('/api/contest/detail/writes', {
				params: {
					_id: detail._id, // 해당 공모전 글의 모집 글 요청
				},
			})
			.then((res) => {
				console.log(res);
				setWrites(res.data);
			});
	}, []);

	const writing = () => {
		setAddWriting(true);
	};

	const addWriting = (newWrite) => {
		setAddWriting(false);
		axios
			.post('/api/contest/detail/addWrite', { newWrite, detail }) // 공모전 글 아이디도 보내주고 있음
			.then((res) => {
				setWrites(res.data); // 새 글 목록 받아서 저장
			});
	};
	const deleteWrite = (writeId) => {
		axios
			.post('/api/contest/detail/deleteWrite', { writeId, detail }) // 글 id 전달
			.then((res) => {
				setWrites(res.data); // 새 글 목록 받아서 저장 (rerender)
			});
	};
	return (
		<div className={styles.container}>
			<input
				className={`${(user.role === 1) | (user.role === 2) ? styles.addWrite : styles.hidden}`}
				type="button"
				onClick={writing}
				value="모집 글쓰기"
			></input>
			<div>
				<div className={styles.poster}>
					<img src={detail.src} alt="이미지가 없습니다."></img>
					<div className={styles.description}>{detail.description}</div>
				</div>
				{addWrite && <AddWrite writes={writes} user={user} addWriting={addWriting} />}
				{addWrite || (
					<ul className={styles.writingList}>
						{Object.keys(writes).map((key) => {
							return (
								<Write
									key={key}
									writeIndex={key}
									write={writes[key]}
									deleteWrite={deleteWrite}
									user={user}
								/>
							);
						})}
					</ul>
				)}
			</div>
		</div>
	);
};

export default ContestDetail;
