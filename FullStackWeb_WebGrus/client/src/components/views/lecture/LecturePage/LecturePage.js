import React, { useState, useEffect } from 'react';
import { FaCode } from 'react-icons/fa';
import { Card, Avatar, Col, Typography, Row, Button, Divider, message, Skeleton } from 'antd';
import axios from 'axios';

import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function withRouter(Component) {
	function ComponentWithRouterProp(props) {
		let location = useLocation();
		let navigate = useNavigate();
		let params = useParams();
		return <Component {...props} router={{ location, navigate, params }} />;
	}

	return ComponentWithRouterProp;
}

const { Title } = Typography;
const { Meta } = Card;

function LecturePage(props) {
	let navigate = useNavigate();
	const [Lecture, setLecture] = useState([]);

	useEffect(() => {
		axios.get('/api/lectures/getLectures').then((response) => {
			if (response.data.success) {
				setLecture(response.data.lectures);
			} else {
				message.error('Lecture Infomation Error! Please contact the site manager');
				navigate('/');
			}
		});
		return () => {
			setLecture([]);
		};
	}, []);

	var lectureInfo = <></>;
	if (Lecture) {
		lectureInfo = (
			<Row gutter={[32, 16]}>
				{Lecture.map((lectures, index) => {
					return (
						<Col lg={6} md={8} xs={24} key={index}>
							<a href={`/lectures/${lectures._id}`}>
								<div>
									<img style={{ width: '100%' }} src={lectures.filePath} alt="이미지" />
								</div>
								<br />
								<span>
									<h2>{lectures.title}</h2>
								</span>
							</a>
							<br />
							<div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr' }}>
								<Meta
									avatar={<Avatar src={lectures.teacher.image} />}
									title={lectures.teacher.name}
									description=""
								/>
								{lectures.applicationPeriod ? (
									<h3 className="applicationPeriodMarker" style={{ backgroundColor: 'green' }}>
										모집
									</h3>
								) : (
									<h3 className="applicationPeriodMarker" style={{ backgroundColor: 'coral' }}>
										마감
									</h3>
								)}
							</div>
							<br />
						</Col>
					);
				})}
			</Row>
		);
	} else {
		lectureInfo = (
			<div className="app" style={{ width: '50%', margin: 'auto' }}>
				<Skeleton active />
			</div>
		);
	}

	return (
		<div className="app" style={{ display: 'flex', width: '85%', margin: 'auto' }}>
			<Title level={2} style={{ marginTop: '25px' }}>
				강의
			</Title>
			<h4 style={{ color: 'darkgrey' }}>
				한 명의 강의자가 다른 멤버들에게 코딩을 가르쳐줄 수 있는 강의 페이지입니다
			</h4>
			<Divider />
			<br />
			{lectureInfo}
			<br />
			<Divider />
			<br />
			<Divider />
			<a href="/lectures/register">
				<Button type="default" style={{ minWidth: '100%' }}>
					강의 등록하기
				</Button>
			</a>
			<Divider />
		</div>
	);
}

export default withRouter(LecturePage);
