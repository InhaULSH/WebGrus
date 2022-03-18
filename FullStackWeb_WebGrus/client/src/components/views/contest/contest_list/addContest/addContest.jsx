import axios from 'axios';
import React, { useState } from 'react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './addContest.module.css';

const AddContest = ({ user }) => {
	const today = new Date();
	const textRef = useRef();
	const titleRef = useRef();
	const poseterRef = useRef();
	const navigate = useNavigate();
	const [file, setFile] = useState('');
	// const [loading, setLoading] = useState();

	const uploadFile = async () => {
		const fileSrc = await axios.post('/api/contest/addPoseter', file); // 이미지 파일 저장 및 경로 리턴
		console.log('fileSrc를 서버로 부터 받아옴', fileSrc);
		return fileSrc;
	};

	const writing = async (event) => {
		// event.preventDafault();

		// 공모전 포스터 이미지를 저장한 경로를 받아온다.
		let fileSrc = await uploadFile();
		// fileSrc = fileSrc.slice(14);

		// 새로 등록할 공모전
		const newWrite = {
			id: 'user id',
			src: fileSrc.data || '',
			title: titleRef.current.value,
			description: textRef.current.value,
			author: 'user name',
			date: `${today.getFullYear()}. ${today.getMonth() + 1}. ${today.getDate()}`,
		};

		axios
			.post('/api/contest/addWrite', newWrite) // 글 추가
			.then(navigate(-1))
			.catch((err) => {
				alert('글이 제대로 저장되지 않았습니다.');
				console.log(err);
			});
	};

	const handelPoster = async (event) => {
		const formData = new FormData();
		formData.append('file', event.target.files[0]);
		// for (let value of formData.values()) { // formData는 그냥 콘솔로 안보여서 value 확인하는 방법
		// 	console.log(value);
		// }
		// const response = await axios.post('/api/contest/testing', formData);
		setFile(formData);
	};

	const handleHiddenPoster = (event) => {
		event.preventDefault();
		poseterRef.current.click();
	};

	return (
		<form onSubmit={writing} className={styles.addForm}>
			<label className={styles.label}>
				<div className={styles.role}> 제목: </div>
				<input
					className={styles.title}
					ref={titleRef}
					type="text"
					placeholder="제목을 입력하세요."
				></input>
			</label>
			<label className={styles.label}>
				<div className={styles.role}> 내용: </div>
				<textarea
					className={styles.textarea}
					ref={textRef}
					placeholder="내용을 입력하세요."
				></textarea>
			</label>
			<label className={styles.label}>
				<div className={styles.role}> 포스터: </div>
				<button className={styles.poster} onClick={handleHiddenPoster}>
					포스터 첨부
				</button>
				<input
					ref={poseterRef}
					className={styles.hidden}
					type="file"
					name="poster"
					accept="image/*"
					onChange={handelPoster}
				></input>
			</label>
			<input className={styles.button} type="submit" value="글 작성"></input>
		</form>
	);
};

export default AddContest;
