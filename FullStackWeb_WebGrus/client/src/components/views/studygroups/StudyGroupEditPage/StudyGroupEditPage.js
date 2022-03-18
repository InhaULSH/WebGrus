import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { editStudyGroup } from "../../../../_actions/studygroup_actions";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  Form,
  Input,
  Button,
  Typography,
  message,
  InputNumber,
  Skeleton,
  Checkbox,
  Icon
} from "antd";
import Dropzone from "react-dropzone";
import axios from "axios";
import { useSelector } from "react-redux";

import { useLocation, useNavigate, useParams } from "react-router-dom";

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }

  return ComponentWithRouterProp;
}

const { TextArea } = Input;
const { Title } = Typography;

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

function StudyGroupEditPage(props) {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user); // redux state에서 유저정보 가져옴

  const [StudyGroupDetail, setStudyGroupDetail] = useState([]);
  const [StudyGroupFilePath, setStudyGroupFilePath] = useState("");

  const { studygroupId } = useParams();
  const variable = {
    studygroupId: studygroupId,
  };

  useEffect(() => {
    axios
      .post("/api/studygroups/getStudyGroupDetail", variable)
      .then((response) => {
        if (response.data.success) {
          setStudyGroupDetail(response.data.studygroupDetail);
          setStudyGroupFilePath(response.data.studygroupDetail.filePath);
          console.log(response.data.studygroupDetail)
        } else {
          message.error(
            "그룹 정보를 불러오지 못 했습니다! 관리자에게 문의하세요"
          );
          navigate("/studygroups");
        }
      });
  }, []);

  const [formErrorMessage, setFormErrorMessage] = useState("");

  const onDropFile = (files) => {
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/formdata" },
    };
    formData.append("file", files[0]);

    axios
      .post("/api/studygroups/uploadThumnail", formData, config)
      .then((response) => {
        if (response.data.success) {
          setStudyGroupFilePath(response.data.url);
        } else {
          setFormErrorMessage(
            "썸네일을 불러오지 못 했습니다! 파일 형식을 확인해주세요"
          );
        }
      })
      .catch((err) => {
        setFormErrorMessage(
          "썸네일을 불러오지 못 했습니다! 파일 형식을 확인해주세요"
        );
        setTimeout(() => {
          setFormErrorMessage("");
        }, 3000);
      });
  };

  if (StudyGroupDetail.manager && user.userData && StudyGroupFilePath) {
    return (
      <Formik
        initialValues={{
          _id: StudyGroupDetail._id,
          manager: user.userData._id,
          title: StudyGroupDetail.title,
          description: StudyGroupDetail.description,
          contactInfo: StudyGroupDetail.contactInfo,
          capacity: StudyGroupDetail.capacity,
          filePath: StudyGroupFilePath,
        }}
        validationSchema={Yup.object().shape({
          manager: Yup.string(),
          title: Yup.string().required("그룹명은 반드시 입력해야합니다!"),
          description: Yup.string()
            .required("설명은 반드시 입력해야 합니다!")
            .min(10, "설명은 최소 10자 이상 입력해야합니다!"),
          contactInfo: Yup.string().required("연락처는 반드시 입력해야합니다!"),
          capacity: Yup.number().required("그룹 정원은 반드시 입력해야합니다!"),
          filePath: Yup.string(),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            let dataToSubmit = {
              _id: StudyGroupDetail._id,
              manager: user.userData._id,
              title: values.title,
              description: values.description,
              contactInfo: values.contactInfo,
              capacity: values.capacity,
              filePath: StudyGroupFilePath,
            };

            dispatch(editStudyGroup(dataToSubmit))
              .then((response) => {
                if (response.payload.success) {
                  message.success("스터디 그룹이 수정되었습니다");
                  setTimeout(() => {
                    navigate("/");
                  }, 2000);
                } else {
                  setFormErrorMessage(
                    "스터디 그룹 수정에 실패했습니다! 입력한 값을 확인해주세요"
                  );
                }
              })
              .catch((err) => {
                setFormErrorMessage(
                  "스터디 그룹 수정에 실패했습니다! 입력한 값을 확인해주세요"
                );
                setTimeout(() => {
                  setFormErrorMessage("");
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
            <div
              className="app"
              style={{
                minWidth: "575px",
                maxWidth: "1000px",
                margin: "2rem auto",
              }}
            >
              <div style={{ textAlign: "center", marginBottom: "2rme" }}>
                <Title level={2}>스터디 그룹 수정하기</Title>
              </div>
              <br />
              <div>
                <Form style={{ minWidth: "475px" }} onSubmit={handleSubmit}>
                  <Form.Item label="썸네일">
                    <div
                      style={{ display: "grid", gridTemplateColumns: '2fr 1fr' }}
                    >
                      <Dropzone
                        onDrop={onDropFile}
                        multiple={false}
                        maxSize={100000000000}
                      >
                        {({ getRootProps, getInputProps }) => (
                          <div
                            style={{
                              width: "300px",
                              height: "240px",
                              border: "1px solid lightgray",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                            {...getRootProps()}
                          >
                            <input {...getInputProps()} />
                            <Icon type="plus" style={{ fontSize: "3rem" }} />
                          </div>
                        )}
                      </Dropzone>
                      <div style={{ display: 'grid', gridTemplateRows: '8fr 1fr'}}>
                        <div />
                        {StudyGroupFilePath ? <Icon type="check-circle" theme="filled" style={{ fontSize: "1.5rem", color: '#00db28' }} /> : <></>}
                      </div>
                    </div>
                  </Form.Item>
                  <br />
                  <Form.Item required label="그룹명">
                    <Input
                      id="title"
                      placeholder="그룹의 이름을 입력하세요"
                      type="text"
                      value={values.title}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.title && touched.title
                          ? "text-input error"
                          : "text-input"
                      }
                    />
                    {errors.title && touched.title && (
                      <div className="input-feedback">{errors.title}</div>
                    )}
                  </Form.Item>
                  <br />
                  <Form.Item required label="설명">
                    <Input
                      id="description"
                      placeholder="그룹에 대한 설명을 간략히 적어주세요"
                      type="text"
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.description && touched.description
                          ? "text-input error"
                          : "text-input"
                      }
                    />
                    {errors.description && touched.description && (
                      <div className="input-feedback">{errors.description}</div>
                    )}
                  </Form.Item>
                  <br />
                  <Form.Item
                    required
                    label="매니저 연락처"
                    hasFeedback
                    validateStatus={
                      errors.contactInfo && touched.contactInfo
                        ? "error"
                        : "success"
                    }
                  >
                    <Input
                      id="contactInfo"
                      placeholder="그룹원과의 연락을 위해 연락처를 남겨주세요"
                      type="text"
                      value={values.contactInfo}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.contactInfo && touched.contactInfo
                          ? "text-input error"
                          : "text-input"
                      }
                    />
                    {errors.contactInfo && touched.contactInfo && (
                      <div className="input-feedback">{errors.contactInfo}</div>
                    )}
                  </Form.Item>
                  <br />
                  <Form.Item
                    required
                    label="정원"
                    hasFeedback
                    validateStatus={
                      errors.capacity && touched.capacity ? "error" : "success"
                    }
                  >
                    <Input
                      id="capacity"
                      placeholder="그룹의 정원을 입력해 주세요(숫자만 입력할 수 있습니다)"
                      type="number"
                      value={values.capacity}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.capacity && touched.capacity
                          ? "text-input error"
                          : "text-input"
                      }
                    />
                    {errors.capacity && touched.capacity && (
                      <div className="input-feedback">{errors.capacity}</div>
                    )}
                  </Form.Item>

                  {formErrorMessage && (
                    <label>
                      <p
                        style={{
                          color: "#ff0000bf",
                          fontSize: "0.7rem",
                          border: "1px solid",
                          padding: "1rem",
                          borderRadius: "10px",
                        }}
                      >
                        {formErrorMessage}
                      </p>
                    </label>
                  )}
                  <br />
                  <Form.Item {...tailFormItemLayout}>
                    <Button
                      onClick={handleSubmit}
                      type="primary"
                      disabled={isSubmitting}
                    >
                      수정
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          );
        }}
      </Formik>
    );
  } else {
    return (
      <div className="app" style={{ width: "50%", margin: "auto" }}>
        <Skeleton active />
      </div>
    );
  }
}

export default withRouter(StudyGroupEditPage);
