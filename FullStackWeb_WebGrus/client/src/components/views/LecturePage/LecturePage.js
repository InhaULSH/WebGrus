import React, { useState, useEffect } from 'react'
import { FaCode } from "react-icons/fa";
import { withRouter } from "react-router-dom";
import { Card, Icon, Avatar, Col, Typography, Row } from 'antd';
import axios from 'axios';

const { Title } = Typography;
const { Meta } = Card;

function LecturePage() {
    const [Lecture, setLecture] = useState([])

    useEffect(() => {
      axios.get('/api/lectures/getLecture').then(response => {
        if (response.data.success) {
          setLecture(response.data.lectures)
        } else {
          alert('Lecture Infomation Error! Please contact the site manager.')
        }
      })
    }, [])

    return (
      <div className="app" style={{ width: '85%', margin: '3rem auto' }}>
        <Title level={2}> Lectures </Title>
        <br />
        <Row gutter={[32, 16]}>
          {Lecture.map((lectures, index) => {
            return <Col lg={6} md={8} xs={24}>
              <a href={`/lectures/${lectures._id}`}>
                <div style={{ position: 'relative'}}>
                  <img style={{ width: '100%' }} src={`http://localhost:5000/${lectures.filePath}`} />
                  <div className="applicationCurrent">
                    <span>{lectures.application} / {lectures.capacity}</span>
                  </div>
                </div>
              </a>
              <br />
              <Meta avatar={<Avatar src={lectures.teacher.Image} />} title={lectures.title} description="" />
              <span>{lectures.teacher.name}</span>
              <br />
            </Col>
          })}
        </Row>
      </div>
    )
}

export default withRouter(LecturePage);
