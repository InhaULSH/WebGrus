import React, { useState } from "react";
import moment from "moment";
import { Typography, message } from "antd";
import { Formik } from "formik";
import * as Yup from "yup";
import { registerUser } from "../../../../_actions/user_actions";
import { useDispatch } from "react-redux";
import { Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
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

function RegisterPage(props) {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [formErrorMessage, setFormErrorMessage] = useState("");

  return (
    <Formik
      initialValues={{
        id: "",
        password: "",
        email: "",
        name: "",
        confirmPassword: "",
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required("이름은 반드시 입력해야합니다!"),
        email: Yup.string()
          .email("이메일 양식이 올바르지 않습니다!")
          .required("이메일은 반드시 입력해야합니다!"),
        id: Yup.string().required("학번은 반드시 입력해야합니다!"),
        password: Yup.string()
          .min(6, "비밀번호는 6자리 이상 입력해야합니다!")
          .required("비밀번호는 반드시 입력해야합니다!"),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("password"), null], "비밀번호가 일치하지 않습니다")
          .required("비밀번호 확인은 반드시 입력해야합니다!"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          let dataToSubmit = {
            email: values.email,
            id: values.id,
            password: values.password,
            name: values.name,
            image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`,
          };

          dispatch(registerUser(dataToSubmit))
            .then((response) => {
              if (response.payload.success) {
                message.success(
                  "회원가입에 성공했습니다! 관리자의 승인을 기다려주세요"
                );
                navigate("/login");
              } else {
                setFormErrorMessage("회원가입에 실패했습니다! 입력한 값을 확인해주세요");
              }
            })
            .catch((err) => {
              setFormErrorMessage("회원가입에 실패했습니다! 입력한 값을 확인해주세요");
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
            <Title level={2}>회원가입</Title>
            <h4 style={{ color: 'darkgray' }}>개인정보를 정확히 입력해주세요.
            입부 신청때에 제출한 정보와 대조하여 관리자가 가입을 승인합니다.</h4>
            <br />
            <Form
              style={{ minWidth: "475px" }}
              onSubmit={handleSubmit}
              {...formItemLayout}
            >
              <Form.Item required label="이름">
                <Input
                  id="name"
                  placeholder="이름을 입력해주세요"
                  type="text"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.name && touched.name
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.name && touched.name && (
                  <div className="input-feedback">{errors.name}</div>
                )}
              </Form.Item>

              <Form.Item
                required
                label="이메일"
                hasFeedback
                validateStatus={
                  errors.email && touched.email ? "error" : "success"
                }
              >
                <Input
                  id="email"
                  placeholder="이메일을 입력해주세요"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.email && touched.email
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.email && touched.email && (
                  <div className="input-feedback">{errors.email}</div>
                )}
              </Form.Item>

              <Form.Item
                required
                label="학번"
                hasFeedback
                validateStatus={errors.id && touched.id ? "error" : "success"}
              >
                <Input
                  id="id"
                  placeholder="학번을 입력해주세요"
                  type="text"
                  value={values.id}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.id && touched.id ? "text-input error" : "text-input"
                  }
                />
                {errors.id && touched.id && (
                  <div className="input-feedback">{errors.password}</div>
                )}
              </Form.Item>

              <Form.Item
                required
                label="비밀번호"
                hasFeedback
                validateStatus={
                  errors.password && touched.password ? "error" : "success"
                }
              >
                <Input
                  id="password"
                  placeholder="비밀번호를 입력해주세요"
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

              <Form.Item required label="비밀번호 확인" hasFeedback>
                <Input
                  id="confirmPassword"
                  placeholder="비밀번호를 한번 더 입력해주세요"
                  type="password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.confirmPassword && touched.confirmPassword
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <div className="input-feedback">{errors.confirmPassword}</div>
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

              <Form.Item {...tailFormItemLayout}>
                <Button
                  onClick={handleSubmit}
                  type="primary"
                  disabled={isSubmitting}
                >
                  가입
                </Button>
              </Form.Item>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
}

export default RegisterPage;
