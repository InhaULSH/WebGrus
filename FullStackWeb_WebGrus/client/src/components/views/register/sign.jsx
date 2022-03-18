import React, { useRef } from 'react';
import styles from './sign.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Sign = (props) => {
	const formRef = useRef();
	const navigate = useNavigate();

	// 회원 가입 요청
	const sign = (event) => {
		event.preventDefault();
		if (formRef.current.passWord.value === formRef.current.passWordCheck.value) {
			axios
				.post('/api/users/sign', {
					id: formRef.current.id.value,
					name: formRef.current.name.value,
					passWord: formRef.current.passWord.value,
					email: formRef.current.email.value,
				})
				.then((res) => {
					if (res.data.msg === 'idDuplicate') {
						alert('중복된 학번입니다.');
					} else {
						alert('회원가입 승인을 기다려주세요.');
						navigate('/login'); // 성공시 로그인 페이지로
					}
				});

			formRef.current.reset();
		} else {
			alert('비밀번호를 확인해주세요.'); // passWord가 확인과 같지 않음.
			formRef.current.passWord.value = '';
			formRef.current.passWordCheck.value = '';
		}
	};
	return (
		<div className={styles.container}>
			<div className={styles.formContainer}>
				<form ref={formRef} className={styles.form} onSubmit={sign}>
					<input type="text" name="name" placeholder="이름(실명)" autoFocus />
					<input type="text" name="id" placeholder="학번" />
					<input type="password" name="passWord" placeholder="비밀번호" />
					<input type="password" name="passWordCheck" placeholder="비밀번호 확인" />
					<input type="email" name="email" placeholder="이메일" />
					<input type="submit" value="가입"></input>
				</form>
			</div>
		</div>
	);
};

export default Sign;
