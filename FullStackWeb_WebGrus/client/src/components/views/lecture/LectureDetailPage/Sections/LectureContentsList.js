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
	const LectureContents = props.LectureContents;

	const [IsEditVisible, setIsEditVisible] = useState(false);
	const showEdit = () => {
		setIsEditVisible(true);
	};
	const editCancle = () => {
		setIsEditVisible(false);
	};

	const onDelete = (event, postId) => {
		event.preventDefault();

		let variable = {
			postId: postId,
		};

		axios.post('/api/lectureContents/delete', variable).then((response) => {
			if (response.data.success) {
				message.warning('콘텐츠가 삭제되었습니다!');
				window.location.reload();
			} else {
				message.error('콘텐츠 삭제에 실패했습니다! 관리자에게 문의하세요');
				window.location.reload();
			}
		});
	};

	return (
		<div style={{ width: '100%' }}>
			<Collapse
				bordered={true}
				defaultActiveKey={[1]}
				expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
				className="site-collapse-custom-collapse"
				accordion
			>
				{LectureContents.map((contents, index) => {
					return (
						<Panel
							header={contents.title}
							key={index}
							style={{ fontSize: 'large' }}
							className="site-collapse-custom-panel"
						>
							<p style={{ fontSize: 'large' }}>{contents.content}</p>
							<br />
							<div style={{ display: 'grid', gridTemplateColumns: '5fr 1fr 1fr' }}>
								<Meta
									avatar={<Avatar src={contents.writer.image} />}
									title={contents.writer.name}
									description=""
								/>

								<Popconfirm
									title="확실합니까? 삭제한 뒤에는 복구할 수 없습니다"
									placement="topRight"
									icon={<Icon type="question" style={{ color: 'red' }} />}
									onConfirm={(event) => onDelete(event, contents._id)}
								>
									<Button type="link" style={{ color: 'red', width: '60px' }}>
										<Icon
											type="close"
											style={{
												display: 'flex',
												fontSize: 'x-large',
												justifyContent: 'flex-end',
												alignItems: 'right',
											}}
										/>
									</Button>
								</Popconfirm>

								<Button type="link" style={{ width: '60px' }} onClick={showEdit}>
									<Icon
										type="edit"
										style={{
											display: 'flex',
											fontSize: 'x-large',
											justifyContent: 'flex-end',
											alignItems: 'right',
										}}
									/>
								</Button>

								<Formik
									initialValues={{
										postId: contents._id,
										title: contents.title,
										content: contents.content,
									}}
									validationSchema={Yup.object().shape({
										postId: Yup.string(),
										title: Yup.string().required('제목은 반드시 입력해야합니다!'),
										content: Yup.string().required('내용은 반드시 입력해야합니다!'),
									})}
									onSubmit={(values, { setSubmitting }) => {
										setTimeout(() => {
											let dataToSubmit = {
												postId: contents._id,
												title: values.title,
												content: values.content,
											};

											axios
												.post('/api/lectureContents/edit', dataToSubmit)
												.then((response) => {
													if (response.data.success) {
														message.success('컨텐츠가 수정되었습니다!');
														window.location.reload();
													} else {
														setFormErrorMessage('콘텐츠 수정에 실패했습니다! 입력한 값을 확인해주세요');
													}
												})
												.catch((err) => {
													setFormErrorMessage('콘텐츠 수정에 실패했습니다! 입력한 값을 확인해주세요');
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
												title="강의 컨텐츠 수정하기"
												visible={IsEditVisible}
												onOk={handleSubmit}
												onCancel={editCancle}
												okText="수정"
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
															className={
																errors.title && touched.title ? 'text-input error' : 'text-input'
															}
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
																errors.content && touched.content
																	? 'text-input error'
																	: 'text-input'
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
						</Panel>
					);
				})}
			</Collapse>
		</div>
	);
}

export default withRouter(LectureContentsList);
