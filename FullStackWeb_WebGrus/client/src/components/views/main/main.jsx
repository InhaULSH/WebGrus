import React from 'react';
import styles from './main.module.css';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { FaCode } from "react-icons/fa";

const Main = (props) => {
	const [title, setTitle] = useState('서버 연결 실패');

	useEffect(() => {
		axios
			.get('/api/webgrus/test') //
			.then((res) => {
				setTitle(res.data);
			});
	}, []);

	return (
		<div className="app">
			<FaCode style={{ fontSize: '6em' }} /><br />
			<span style={{ fontSize: '2rem' }}>Let's Start Coding!</span>
		</div>
	);
};

export default Main;
