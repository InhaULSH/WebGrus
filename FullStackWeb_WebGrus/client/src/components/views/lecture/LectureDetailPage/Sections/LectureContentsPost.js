import React, { useEffect, useState } from 'react';
import {
	Button,
	Skeleton,
	Divider,
	Tooltip,
	message,
	Col,
	Card,
	Avatar,
	Row,
	Input,
	Form,
	Typography,
	Collapse,
	Modal,
	Popconfirm,
	Icon
} from 'antd';
import axios from 'axios';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

function withRouter(Component) {
	function ComponentWithRouterProp(props) {
		let location = useLocation();
		let navigate = useNavigate();
		let params = useParams();
		return <Component {...props} router={{ location, navigate, params }} />;
	}

	return ComponentWithRouterProp;
}

const { Panel } = Collapse;
const { Title } = Typography;
const { Meta } = Card;
const { TextArea } = Input;

function LectureContentsList(props) {
	const [formErrorMessage, setFormErrorMessage] = useState('');

	const [IsPostVisible, setIsPostVisible] = useState(false);
	const showPost = () => {
		setIsPostVisible(true);
	};
	const postCancle = () => {
		setIsPostVisible(false);
	};

	return (
		<div>
			<Button type="link" onClick={showPost} style={{ width: '20vh' }}>
				<Icon
					type="plus-square"
					style={{
						display: 'flex',
						fontSize: 'x-large',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				/>
			</Button>

			<Formik
				initialValues={{
					writer: props.user.userData._id,
					lectureId: props.ThisLecture._id,
					title: '',
					content: '',
				}}
				validationSchema={Yup.object().shape({
					writer: Yup.string(),
					lectureId: Yup.string(),
					title: Yup.string().required('제목은 반드시 입력해야합니다!'),
					content: Yup.string().required('내용은 반드시 입력해야합니다!'),
				})}
				onSubmit={(values, { setSubmitting }) => {
					setTimeout(() => {
						let dataToSubmit = {
							writer: props.user.userData._id,
							lectureId: props.ThisLecture._id,
							title: values.title,
							content: values.content,
						};

						axios
							.post('/api/lectureContents/post', dataToSubmit)
							.then((response) => {
								if (response.data.success) {
									message.success('컨텐츠가 게시되었습니다!');
									window.location.reload();
								} else {
									setFormErrorMessage('컨텐츠 게시에 실패했습니다! 입력한 값을 확인해주세요');
								}
							})
							.catch((err) => {
								setFormErrorMessage('컨텐츠 게시에 실패했습니다! 입력한 값을 확인해주세요');
								setTimeout(() => {
									setFormErrorMessage('');
								}, 3000);
							});

						setSubmitting(false);
					}, 500);
				}}
			>
				{(props) => {
					const {
						values,
						touched,
						errors,
						dirty,
						isSubmitting,
						handleChange,
						handleBlur,
						handleSubmit,
						handleReset,
					} = props;
					return (
						<Modal
							title="강의 컨텐츠 게시하기"
							visible={IsPostVisible}
							onOk={handleSubmit}
							onCancel={postCancle}
							okText="게시"
							cancelText="취소"
						>
							<Form
								style={{ display: 'grid', gridTemplateRows: '1fr 1fr', width: '90%' }}
								onSubmit={handleSubmit}
							>
								<Form.Item
									label="제목"
									hasFeedback
									validateStatus={errors.title && touched.title ? 'error' : 'success'}
								>
									<Input
										id="title"
										placeholder="제목을 입력하세요"
										type="text"
										value={values.title}
										onChange={handleChange}
										onBlur={handleBlur}
										className={errors.title && touched.title ? 'text-input error' : 'text-input'}
										style={{ wdith: '90%', borderRadius: '4px' }}
									/>
									{errors.title && touched.title && (
										<div className="input-feedback">{errors.title}</div>
									)}
								</Form.Item>
								<Form.Item
									label="내용"
									hasFeedback
									validateStatus={errors.content && touched.content ? 'error' : 'success'}
								>
									<TextArea
										id="content"
										placeholder="내용을 입력하세요"
										type="text"
										value={values.content}
										onChange={handleChange}
										onBlur={handleBlur}
										className={
											errors.content && touched.content ? 'text-input error' : 'text-input'
										}
										style={{ wdith: '90%', borderRadius: '4px' }}
									/>
									{errors.content && touched.content && (
										<div className="input-feedback">{errors.content}</div>
									)}
								</Form.Item>

								{formErrorMessage && (
									<label>
										<p
											style={{
												color: '#ff0000bf',
												fontSize: '0.7rem',
												border: '1px solid',
												padding: '1rem',
												borderRadius: '10px',
											}}
										>
											{formErrorMessage}
										</p>
									</label>
								)}
							</Form>
						</Modal>
					);
				}}
			</Formik>
		</div>
	);
}

export default withRouter(LectureContentsList);
