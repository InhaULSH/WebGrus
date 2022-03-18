import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './notice.module.css';
import Write from '../write/write';
import AddWrite from '../write/addwrite/addWrite';
import axios from 'axios';
import SelectPage from '../write/selectPage/selectPage';
import EditWrite from '../write/editWrite/editWrite';

const Notice = ({}) => {
	const [addWrite, setAddWriting] = useState(false);
	const [editWrite, setEditWriting] = useState({
		write: '',
		status: false,
	});
	const [writes, setWrites] = useState([]);
	const [keyword, setKeyword] = useState(''); // 검색 키워드
	let user = useSelector((state) => state.user.userData);

	useEffect(() => {
		// 글 목록 불러오기
		pageChange(1); // 처음엔 1페이지 불러오기

		return () => {
			setWrites([]);
		};
	}, []);

	// 해당 페이지 글 보여주기
	const pageChange = async (page) => {
		await axios
			.get('/api/notice/writes', { params: { page } }) // 글 목록 요청 -> 페이지별 글 나누기
			.then((res) => {
				setWrites(res.data);
			});
	};

	// 글쓰기 보이게
	const writing = () => {
		setAddWriting(true);
	};

	// 수정 페이지 보이게 + 수정할 글 정보 저장
	const editing = (write) => {
		setEditWriting((state) => {
			return { ...state, status: true, write: write };
		});
	};

	// 글 수정 요청
	const editWriting = (editWrite) => {
		console.log(editWrite); // 원래 글 양식에서 제목과 내용만 수정된 object

		// todo 글 수정 요청 이 부분을 서버에서 해주시면 될 것 같습니다.
		// axios
		// 	.post('/api/notice/editWrite', { editWrite }) //
		// 	.then((res) => {
		// 		setWrites(res.data); // 1페이지 글 목록 받아서 저장
		// 		console.log(res);
		// 	});
	};

	// 글쓰고 추가 요청
	const addWriting = (newWrite) => {
		setAddWriting(false);

		axios
			.post('/api/notice/addWrite', { newWrite }) //
			.then((res) => {
				setWrites(res.data); // 1페이지 글 목록 받아서 저장
			});
	};

	// 글 삭제 요청
	const deleteWrite = async (writeId) => {
		await axios
			.post('/api/notice/deleteWrite', { writeId }) // 글 id 전달
			.then((res) => {
				setWrites(res.data); // 1페이지 글 목록 받아서 저장
			});
	};

	// 검색 버튼을 클릭했을때
	const searchWriting = () => {
		axios
			.get('/api/notice/search', { params: keyword }) //
			.then((res) => {
				setWrites(res.data);
			});
	};

	const changeKeyword = (e) => {
		setKeyword(e.target.value);
	};

	return (
		<>
			<div className={styles.container}>
				<section className={styles.notice}>
					<div className={styles.header}>
						<div className={styles.noticeTitle}>공지사항</div>
						<form className={styles.search}>
							<input
								className={styles.searchInput}
								type="search"
								placeholder="🔍"
								onChange={changeKeyword}
							></input>
							<input
								className={styles.searchButton}
								type="button"
								value="검색"
								onClick={searchWriting}
							></input>
							<input
								className={`${
									(user.role === 1) | (user.role === 2) ? styles.addWrite : styles.hidden
								}`}
								type="button"
								onClick={writing}
								value="글쓰기"
							></input>
						</form>
					</div>
					{editWrite.status && <EditWrite write={editWrite.write} editWriting={editWriting} />}
					{addWrite && <AddWrite writes={writes.writes} user={user} addWriting={addWriting} />}
					{addWrite || (
						<ul className={`${editWrite.status ? styles.hidden : styles.writingList}`}>
							{writes.writes &&
								Object.keys(writes.writes).map((key) => {
									return (
										<Write
											key={key}
											writeIndex={key}
											user={user}
											write={writes.writes[key]}
											editing={editing}
											deleteWrite={deleteWrite}
										/>
									);
								})}
						</ul>
					)}
					{addWrite || (
						<div className={`${styles.pages} ${editWrite.status ? styles.hidden : styles.none}`}>
							{writes.pages &&
								// 전달 받은 페이지의 수 만큼 페이지 이동 버톤 만들기
								[...Array(writes.pages)].map((n, index) => {
									return <SelectPage key={index} page={index} pageChange={pageChange} />;
								})}
						</div>
					)}
				</section>
			</div>
		</>
	);
};

export default Notice;
