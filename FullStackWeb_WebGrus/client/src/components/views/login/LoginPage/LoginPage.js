import React, { useState } from "react";
import { loginUser } from "../../../../_actions/user_actions";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Input, Button, Checkbox, Typography, message, Icon } from "antd";
import { useDispatch } from "react-redux";

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

const { Title } = Typography;

function LoginPage(props) {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false;

  const [formErrorMessage, setFormErrorMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(rememberMeChecked);

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  const initialID = localStorage.getItem("rememberMe")
    ? localStorage.getItem("rememberMe")
    : "";

  return (
    <>
      <Formik
        initialValues={{
          id: initialID,
          password: "",
        }}
        validationSchema={Yup.object().shape({
          id: Yup.string().required("학번을 입력해주세요"),
          password: Yup.string()
            .min(6, "비밀번호는 6자리 이상 입력해야합니다")
            .required("비밀번호를 입력해주세요"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            let dataToSubmit = {
              id: values.id,
              password: values.password,
            };

            dispatch(loginUser(dataToSubmit))
              .then((response) => {
                if (response.payload.loginSuccess) {
                  window.localStorage.setItem(
                    "userId",
                    response.payload.userId
                  );
                  if (rememberMe === true) {
                    window.localStorage.setItem("rememberMe", values.id);
                  } else {
                    localStorage.removeItem("rememberMe");
                  }
                  navigate("/");
                } else {
                  setFormErrorMessage(
                    "학번이나 비밀번호를 확인해주세요"
                  );
                }
              })
              .catch((err) => {
                setFormErrorMessage("ID나 비밀번호를 확인해주세요");
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
            <div className="app">
              <Title level={2}>로그인</Title>
              <form onSubmit={handleSubmit} style={{ width: "350px" }}>
                <Form.Item required>
                  <Input
                    id="id"
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="학번"
                    type="text"
                    value={values.id}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.id && touched.id
                        ? "text-input error"
                        : "text-input"
                    }
                  />
                  {errors.id && touched.id && (
                    <div className="input-feedback">{errors.id}</div>
                  )}
                </Form.Item>

                <Form.Item required>
                  <Input
                    id="password"
                    prefix={
                      <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="비밀번호"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.password && touched.password
                        ? "text-input error"
                        : "text-input"
                    }
                  />
                  {errors.password && touched.password && (
                    <div className="input-feedback">{errors.password}</div>
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

                <Form.Item>
                  <div
                    style={{ display: "grid", gridTemplateColumns: "2fr 1fr" }}
                  >
                    <Checkbox
                      id="rememberMe"
                      onChange={handleRememberMe}
                      checked={rememberMe}
                    >
                      학번 기억하기
                    </Checkbox>
                  </div>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    style={{ minWidth: "100%" }}
                    disabled={isSubmitting}
                    onSubmit={handleSubmit}
                  >
                    로그인
                  </Button>
                  계정이 없다면 <a href="/register">회원가입</a>
                </Form.Item>
              </form>
            </div>
          );
        }}
      </Formik>
    </>
  );
}

export default withRouter(LoginPage);
