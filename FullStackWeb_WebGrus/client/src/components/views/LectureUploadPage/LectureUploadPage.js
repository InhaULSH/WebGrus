import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import {  } from "../../../_actions/user_actions";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Icon, Input, Button, Typography, message } from 'antd';
import Dropzone from 'react-dropzone';

const { TextArea } = Input;
const { Title } = Typography;

function LectureUploadPage(props) {
  const [LectureTitle, setLectureTitle] = useState("")
  const [LectureDescription, setLectureDescription] = useState("")
  const [LectureContact, setLectureContact] = useState("")
  const [LectureCapacity, setLectureCapacity] = useState(1)

  return (
    <div style={{ maxwidth: '700px', margin: '2rem auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rme' }}>
        <Title level={2}>Register Lecture</Title>
      </div>
      <Form>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Dropzone>
            maxSize{({ getRootProps, getInputProps }) => (
              <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center'}} {...getRootProps()}>
                <input {...getInputProps()} />
                <Icon type="plus" style={{ fontSize: '3rem' }} />
              </div>
            )}
          </Dropzone>
          <div>
            <img src alt />
          </div>
        </div>
        <br />
        <br />
        <labe>Lecture Name</label>
        <Input value={LectureTitle} />
        <br />
        <br />
        <labe>Lecture Description</label>
        <TextArea value={LectureDescription} />
        <br />
        <br />
        <labe>Contact Info</label>
        <TextArea value={LectureContact} />
        <br />
        <br />
        <labe>Capacity</label>
        <Input value={LectureCapacity} />
        <br />
        <br />
        <Button type="primary" size="large">
          Register
        </Button>
      </Form>
    </div>
  )
};

export default withRouter(LectureUploadPage);
